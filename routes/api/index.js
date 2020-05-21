const router = require("express").Router();
const db = require("../../models");

/*          /api/[______]              */

router.route('/allUsers')
.get(function(req, res) {
    db.User
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.route('/allProfiles')
.get(function(req, res) {
    db.UserProfile
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.route('/allInterviews')
.get(function(req, res) {
    db.Interviews
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});


router.route("/login/:email/:password")
.get( function (req, res) {
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


module.exports = router;