const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const User = require('../models/User');


router.get('/', function (req, res) {
    res.send('users routes working')
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
        console.log('match',match);
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
      check('email', "email must be valid").custom((value, {req}) => {
          const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g
          const match = pattern.test(value);
          return match;
      })
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }
      return res.json({ url: "home"});
    }
  );
module.exports = router;