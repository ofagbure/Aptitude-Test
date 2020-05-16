const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");

const session = require("express-session");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;



// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'TheMostSecretestSecretOfAllTime'}));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/aptitudedb");

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});