const express = require("express");
const passport = require('passport');
const router = express.Router();
const Article = require('../models/Article');

router.get("/", function (req, res) {
    res.send('article routes working');
});

router.get("/protected", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.status(200).json({message: "Protected Route"})
})
module.exports = router;
