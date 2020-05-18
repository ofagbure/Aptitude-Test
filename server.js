const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const URI = require('./config/index')
const path = require('path');

const session = require("express-session");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;



// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'TheMostSecretestSecretOfAllTime'
}));
app.use(passport.initialize());
app.use(passport.session({}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(routes);

mongoose.connect('mongodb://localhost/aptitudedb' || URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});