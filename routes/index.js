const router = require("express").Router();
// const apiRoutes = require("./api");
const express = require('express');
const app = express();
const path = require('path');
// router.use('/api', apiRoutes);

app.get('/api/allUsers', function(req, res) {
    db.User
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get('/api/allProfiles', function(req, res) {
    db.UserProfile
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get('/api/allInterviews', function(req, res) {
    db.Interviews
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});


app.get('/api/login/:email/:password', function (req, res) {
    db.User
    .findOne({ email: `${req.params.email}` })
    .then(function(dbModel){
        if(dbModel.password === req.params.password) {
            let response = {
                email: `${dbModel.email}`,
                recruiter: `${dbModel.recruiter}`
            }
            res.json(response);
        } else {
            res.json(false);
        }
    })
    .catch( function() {
        res.json(false);
    });
});

app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'client/build/index.html'));
    res.send("index");
});

module.exports = router;