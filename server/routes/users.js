const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const passport = require("passport");

const expirationtimeInMs = 60 * 1000 * 60;
const secret = "jwt_secret_key";
module.exports = function (app) {
  app.locals.limit = "";
  app.locals.time = expirationtimeInMs;
  const router = express.Router();
  
  router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
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
        app.locals.limit = Date.now() + parseInt(expirationtimeInMs);
        // app.locals.time = parseInt(expirationtimeInMs);
        const { _id } = user;
        const payload = {
          sub: _id,
          expiration: app.locals.limit,
        };
        const token = jwt.sign(payload, secret);
        if (process.env.NODE_ENV === "production") {
          return res
            .cookie("jwt", token, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            })
            .json({ success: true });
        } else {
          return res
            .cookie("jwt", token, {
              httpOnly: true,
              secure: false,
            })
            .json({ success: true });
        }
      }
    )(req, res, next);
  });

  //-----------------

  router.get("/test", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.send("<h1>UnAuthorized!</h1>");
        }
        res.json({ success: true });
      }
    )(req, res, next);
  });

  return router;
};
