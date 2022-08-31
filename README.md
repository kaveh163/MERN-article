# News Media App

This is a MERN (MongoDB, Express, React, Node) app. In this project I built  a **N**ews **M**edia
**A**pp were authors of the news articles can login, create, delete and update their articles and post them in the site. This app uses JWT Tokens which are sent inside cookies from the server to authorize and authenticate users (authors) of the app. To accomplish this task passport-local and passport-jwt Passport strategies were used.
In order to validate the fields specified during registering, logging in, creating and updating articles express-validator npm was used. In the frontend side, I used React which is JavaScript library for building user interfaces. Inside React I used the react-router-dom package which enables implementing dynamic routing in the app.for storing the articles and users information MongoDB (NoSQL) database was used.


Below is a snapshot of the project.

![News Media App](./Assets/newsApp.png)

## Instructions
It is presumed that you have already installed Node.js MongoDB and Git in your device.
* Clone the app repository from GitHub.
* Open terminal inside the root folder and install the Node required dependencies using "npm install".
* Open terminal inside client folder and install the React required dependencies using "npm install".
* In the Node terminal run npm start.
* In the React terminal run npm start.
* The app will be successfully loaded.


## Usage
This app provides authors of the news articles to post and modify their covering in the site.

## Tests
This app was tested manually.

## Future
More features such as handling passwords which are forgotten during users login will be added in the future.


  
  


















