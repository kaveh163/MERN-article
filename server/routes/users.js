const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

const expirationtimeInMs = 60 * 1000;
const secret = "jwt_secret_key";

// router.get("/", function (req, res) {
//   res.send("users routes working");
// });
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Protected route");
    res.json({
      message: "welcome to the protected route!",
    });
  }
);
router.get("/logout", function (req, res) {
  if (req.cookies["jwt"]) {
    res.clearCookie("jwt").status(200).json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid Token" });
  }
});
router.post(
  "/register",
  [
    check("fname", "Please provide firstname").custom((value, { req }) => {
      const pattern = /.+/;
      const match = pattern.test(value);
      return match;
    }),
    check("lname", "Please provide lastname").custom((value, { req }) => {
      const pattern = /.+/;
      const match = pattern.test(value);
      return match;
    }),
    check("pass", "Password must be minimum 8 characters. ").isLength({
      min: 8,
    }),
    check(
      "pass",
      "Password must include uppercase,lowercase letters, digits and symbols"
    ).custom((value, { req }) => {
      const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!*?&]{8,}$/;
      const match = pattern.test(value);
      console.log("match", match);
      return match;
    }),
    check("cpass", "confirm password must match password").custom(
      (value, { req }) => {
        if (value === req.body.pass) {
          return true;
        } else {
          return false;
        }
      }
    ),
    check("email", "email must be valid").custom((value, { req }) => {
      const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
      const match = pattern.test(value);
      return match;
    }),
    check("email", "E-mail already in use").custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (err) {
            reject(new Error("Server Error"));
          }
          if (user) {
            reject(new Error("E-mail already in use"));
          }
          resolve(true);
        });
      });
    }),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    console.log("body", req.body);
    const { fname, lname, pass, cpass, email } = req.body;
    const createRegister = async () => {
      try {
        await User.create({
          firstname: fname,
          lastname: lname,
          password: pass,
          email: email,
        });
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    };
    createRegister();
    return res.json({ url: "home" });
  }
);
router.post(
  "/login",
  [
    check("email", "Email must be provided. ").notEmpty(),
    check("email", "Invalid Email.").isEmail().normalizeEmail(),
    check("password", "Password must be provided.").notEmpty(),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    next();
  }
);
router.post("/login", function (req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.json(info);
      }
      console.log("user", user);
      const { _id } = user;
      console.log(_id);
      const payload = {
        sub: _id,
        expiration: Date.now() + parseInt(expirationtimeInMs),
      };
      const token = jwt.sign(payload, secret);
      res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
        })
        .json({ success: true });
    }
  )(req, res, next);
});

//-----------------

router.get("/test", function (req, res, next) {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.send('<h1>UnAuthorized!</h1>');
    }

    res.json({ success: true });
  })(req, res, next);
});

// router.post(
//   "/login",
//   passport.authenticate("local", { session: false }),
//   (req, res) => {
//     if (req.isAuthenticated()) {
//       const { _id } = req.user;
//       console.log("id", _id);
//       const payload = {
//         sub: _id,
//         expiration: Date.now() + expirationtimeInMs,
//       };
//       console.log("payload", payload);
//       const token = jwt.sign(payload, "jwt_secret_key");
//       res.cookie("jwt", token, {
//         httpOnly: true,
//         secure: false,
//       });
//       res.status(200).json({ success: true });
//     } else {
//       res.json({ message: "Invalid Email and/or Password" });
//     }
//   }
// );

module.exports = router;
