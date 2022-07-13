const express = require("express");
const router = express.Router();
const Article = require('../models/Article');
router.get("/", function (req, res) {
    res.send('article routes working');
});

module.exports = router;
