const express = require("express");
const passport = require('passport');
const router = express.Router();
const Article = require('../models/Article');

// router.get("/", function (req, res) {
//     res.send('article routes working');
// });

router.get("/protected", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.status(200).json({message: req.user})
})
router.get("/user", passport.authenticate('jwt', {session: false}), async function (req, res) {
    console.log(req.user);
    const {_id} = req.user;
    console.log('id', _id);
    const usersArticles = await Article.find({user: _id});
    console.log('usersArticles',usersArticles);
    res.json({data: usersArticles});
})
router.get("/list", async function (req, res) {
    try {
        const articles = await Article.find({}).populate('user');
        console.log('Successfully Fetched all the Articles 👍');
        console.log(articles);
        // res.json({hour:new Date(articles[0].updatedAt).getTime(),articles: articles, updatedAt: `${new Date(articles[0].updatedAt).toLocaleDateString()} ${new Date(articles[0].updatedAt).toLocaleTimeString('en-US', {timeZone: 'Canada/Eastern', hour12: false})}`});
        // res.json({articles: articles, updatedAt: `${new Date(articles[0].updatedAt).toLocaleDateString()} ${new Date(articles[0].updatedAt).toLocaleTimeString()}`});
        res.json({articles: articles});
    } catch (error) {
        console.log(`${error} ❌`);
        process.exit(1);

    }
})
router.post("/protected", passport.authenticate('jwt', {session: false}), async function (req, res) {
   
    const {_id} = req.user;
    const {title, body} = req.body;
    console.log('_id', _id);
    console.log('seperator');
    console.log('title', title);
    console.log('seperator');
    console.log('body', body);
    try {
        await Article.create({title: title, body: body, user: _id});
        console.log('Article Successfully Created in Database.👍')
    } catch (error) {
        console.log(`${error} ❌`);
        process.exit(1);
    }
    res.redirect('/?success=true');
});

router.post("/article", async function (req, res) {
    console.log('body', req.body);
    const {articleId} = req.body;
    const article = await Article.findById(articleId).populate('user');
    console.log('database article' , article);


    res.json({data: article});
})
module.exports = router;
