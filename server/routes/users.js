const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
require("../auth/passport");

router.get("/", function (req, res) {
  res.send("users routes working");
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
router.post('/login', function(req, res, next) {
  passport.authenticate('local', { session : false }, function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.json(info);
    }
    console.log('user', user);
    return res.json({ success : true});
  })(req, res, next);
});

// router.post(
//   "/login",
//   passport.authenticate("local", { session: false }),
//   (req, res) => {
//     if (req.isAuthenticated()) {
      // const { _id, username } = req.user;
      // console.log("id", _id);
      // const payload = {
      //   sub: _id,
      //   aud: "http://localhost:8080",
      //   iss: "http://remote-server.com",
      //   expiration:  Date.now() + expirationtimeInMs
      // };
      // console.log("payload", payload);
      // const token = jwt.sign(payload, secret);
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   secure: false,
      // });
//       console.log("user", req.user);
//       res.status(200).json({ isAuthenticated: true });
//     }
//   }
// );

// router.post("/login", function (req, res) {
//   console.log("body", req.body);
//   const { email, password } = req.body;
//   return res.json({ success : 'Data successfully Posted'});
// });
module.exports = router;
