const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3001;
const passport = require('passport');

const connectDB = require("./config/db");

const app = express();
// app.locals.limit = '';
const articles = require("./routes/articles")(app);
const users = require("./routes/users")(app);



// Parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie middleware
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
require("./auth/passport");

// Routes middlewares
app.use("/api/articles", articles);
app.use("/api/users", users);

connectDB();

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
