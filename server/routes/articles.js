const express = require("express");
const passport = require("passport");

const Article = require("../models/Article");

module.exports = function (app) {
  const router = express.Router();
  // router.get("/", function (req, res) {
  //     res.send('article routes working');
  // });

  router.get("/protected", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.json({ user: "invalid" });
        }
        console.log("app.locals.limit.article/protected", app.locals.limit);
        res.json({ data: "valid", limit: app.locals.limit });
      }
    )(req, res, next);
  });
  // router.get(
  //   "/user",
  //   passport.authenticate("jwt", { session: false }),
  //   async function (req, res) {
  //     console.log(req.user);
  //     const { _id } = req.user;
  //     console.log("id", _id);
  //     const usersArticles = await Article.find({ user: _id });
  //     console.log("usersArticles", usersArticles);
  //     res.json({ data: usersArticles });
  //   }
  // );

  router.get("/user", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.json({ user: "invalid" });
        }
        console.log(user);
        const { _id } = user;
        console.log("id", _id);
        const usersArticles = await Article.find({ user: _id });
        // console.log("usersArticles", usersArticles);
        console.log("app.locals.limit.article/user", app.locals.limit);
        res.json({ data: usersArticles, limit: app.locals.limit });
      }
    )(req, res, next);
  });

  router.get("/list", async function (req, res) {
    try {
      const articles = await Article.find({}).populate("user");
      console.log("Successfully Fetched all the Articles 👍");
      console.log(articles);
      // res.json({hour:new Date(articles[0].updatedAt).getTime(),articles: articles, updatedAt: `${new Date(articles[0].updatedAt).toLocaleDateString()} ${new Date(articles[0].updatedAt).toLocaleTimeString('en-US', {timeZone: 'Canada/Eastern', hour12: false})}`});
      // res.json({articles: articles, updatedAt: `${new Date(articles[0].updatedAt).toLocaleDateString()} ${new Date(articles[0].updatedAt).toLocaleTimeString()}`});
      res.json({ articles: articles });
    } catch (error) {
      console.log(`${error} ❌`);
      process.exit(1);
    }
  });
  // router.post(
  //   "/protected",
  //   passport.authenticate("jwt", { session: false }),
  //   async function (req, res) {
  //     const { _id } = req.user;
  //     const { title, body } = req.body;
  //     console.log("_id", _id);
  //     console.log("seperator");
  //     console.log("title", title);
  //     console.log("seperator");
  //     console.log("body", body);
  //     try {
  //       await Article.create({ title: title, body: body, user: _id });
  //       console.log("Article Successfully Created in Database.");
  //     } catch (error) {
  //       console.log(`${error} `);
  //       process.exit(1);
  //     }
  //     res.redirect("/?success=true");
  //   }
  // );

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
        console.log("_id", _id);
        console.log("seperator");
        console.log("title", title);
        console.log("seperator");
        console.log("body", body);
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
    console.log("body", req.body);
    const { articleId } = req.body;
    const article = await Article.findById(articleId).populate("user");
    console.log("database article", article);

    res.json({ data: article });
  });

  // router.get(
  //   ,
  //   passport.authenticate("jwt", { session: false }),
  //   async function (req, res) {
  //     console.log("updatedId", req.params.id);
  //     const id = req.params.id;
  //     let article;
  //     try {
  //       article = await Article.findById(id).exec();
  //       console.log("updatedArticle", article);
  //     } catch (error) {
  //       console.log("Error Occured");
  //       process.exit(1);
  //     }
  //     res.json({ data: article });
  //   }
  // );

  router.get("/update/article/:id", function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res.json({ user: "invalid" });
        }
        console.log("updatedId", req.params.id);
        const id = req.params.id;
        let article;
        try {
          article = await Article.findById(id).exec();
          console.log("updatedArticle", article);
        } catch (error) {
          console.log("Error Occured");
          process.exit(1);
        }
        console.log("article Bug", article);
        console.log("app.locals.limit.article/updateId", app.locals.limit);
        res.json({ data: article, limit: app.locals.limit });
      }
    )(req, res, next);
  });

  router.post(
    "/update/article/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res) {
      console.log("postid", req.params.id);
      const id = req.params.id;
      console.log("postData", req.body);
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
      console.log("Delete id", req.params.id);
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
