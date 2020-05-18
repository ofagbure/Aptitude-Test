const path = require("path");
const express = require("express");
const apiRoutes = require("./api");
const db = require("../models");
const passport = require('../config/passport');
const app = express();

app.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/candidateportal',
  failureRedirect: '/login'
  })
);
app.post('/login', passport.authenticate('local-signin', { 
  successRedirect: '/candidateportal',
  failureRedirect: '/login'
  })
);
app.get('/logout', function(req, res){
  console.log("Logout: " + req.user.email);
  req.logout();
  res.send("Logged Out: " + req.user.email);
});

app.get('/isLoggedIn', function(req, res){
  if(req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.use("/api", apiRoutes);

app.post('/updateUser', function(req, res){
  let filter = {
    email: req.body.email
  }
  let update = {
    city: req.body.city,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImg: req.body.profilePic,
    description: req.body.userDescription,
    website: req.body.website,
    willMove: req.body.willMove
  }
  db.UserProfile.findOneAndUpdate(filter, update, {
    returnOriginal: false
  }, function(err, results) {
    if(err) { res.send(err) }
    res.send(results);
  })
});

app.post('/addUser', function(req, res){
  let newUser = {
    city: req.body.city,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImg: req.body.profilePic,
    description: req.body.userDescription,
    website: req.body.website,
    willMove: req.body.willMove,
    email: req.body.email
  }
  const userThingy = new db.UserProfile(newUser);
  userThingy.save(function (err) {
    if (err) return res.send(false);
    res.send(true);
  });
});

app.post('/addInterview', function(req, res){
  
  let newInterview = {
    recruiterEmail: req.body.recruiterEmail,
    applicantEmail: req.body.applicantEmail,
    interviewTime: req.body.interviewTime,
    interviewLocation: req.body.interviewLocation,
  }
  const interviewThingy = new db.Interviews(newInterview);
  interviewThingy.save(function (err) {
    if (err) return res.send(false);
    res.send(req.body);
  });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

module.exports = app;