const express = require('express');
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
const articles = require('./routes/articles');
const users = require('./routes/users'); 
const app = express();

//Parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes middlewares
app.use('/articles', articles);
app.use('/users', users);


connectDB();

app.listen(PORT,() => {
    console.log(`Server Listening on port ${PORT}`);
})