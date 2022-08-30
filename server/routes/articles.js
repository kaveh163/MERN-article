const express = require("express");
const passport = require("passport");

const Article = require("../models/Article");

module.exports = function (app) {
  const router = express.Router();
  
  router.get(
    "/expire",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
      res.json({exp: app.locals.time})
    }
  );
  router.get("/protected", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.status(401).json({ user: "invalid" });
        }
        
        res.json({ data: "valid" });
      }
    )(req, res, next);
  });
  
  router.get("/user", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.status(401).json({ user: "invalid" });
        }
        const { _id } = user;
        const usersArticles = await Article.find({ user: _id });    
        res.json({ data: usersArticles });
      }
    )(req, res, next);
  });

  router.get("/list", async function (req, res) {
    try {
      const articles = await Article.find({}).populate("user");
      console.log("Successfully Fetched all the Articles 👍");
      // res.json({hour:new Date(articles[0].updatedAt).getTime(),articles: articles, updatedAt: `${new Date(articles[0].updatedAt).toLocaleDateString()} ${new Date(articles[0].updatedAt).toLocaleTimeString('en-US', {timeZone: 'Canada/Eastern', hour12: false})}`});
      // res.json({articles: articles, updatedAt: `${new Date(articles[0].updatedAt).toLocaleDateString()} ${new Date(articles[0].updatedAt).toLocaleTimeString()}`});
      res.json({ articles: articles });
    } catch (error) {
      console.log(`${error} ❌`);
      process.exit(1);
    }
  });

  router.get("/list/protected", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.json({ user: "invalid" });
        }
        try {
          const articles = await Article.find({}).populate("user");
          console.log("Successfully Fetched all the Articles 👍");    
          res.json({ articles: articles });
        } catch (error) {
          console.log(`${error} ❌`);
          process.exit(1);
        }
      }
    )(req, res, next);
  });

  router.post("/protected", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.redirect("/");
        }
        const { _id } = user;
        const { title, body } = req.body;
        try {
          await Article.create({ title: title, body: body, user: _id });
          console.log("Article Successfully Created in Database.👍");
        } catch (error) {
          console.log(`${error} ❌`);
          process.exit(1);
        }
        res.redirect("/?success=true");
      }
    )(req, res, next);
  });

  router.post("/article", async function (req, res) {
    const { articleId } = req.body;
    const article = await Article.findById(articleId).populate("user");
    res.json({ data: article });
  });

  router.get("/update/article/:id", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.status(401).json({ user: "invalid" });
        }
        const id = req.params.id;
        let article;
        try {
          article = await Article.findById(id).exec();
        } catch (error) {
          console.log("Error Occured");
          process.exit(1);
        }
        res.json({ data: article });
      }
    )(req, res, next);
  });

  router.post(
    "/update/article/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      const id = req.params.id;
      const { title, body } = req.body;
      try {
        await Article.findByIdAndUpdate(id, { title: title, body: body });
      } catch (error) {
        console.log(error);
        process.exit(1);
      }

      res.redirect("/?success=true");
    }
  );
  router.delete(
    "/article/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      const id = req.params.id;
      try {
        const deletedItem = await Article.findByIdAndDelete(id);
      } catch (error) {
        process.exit(1);
        console.log(error);
      }

      res.send("Article Successfully Deleted");
    }
  );
  return router;
};
