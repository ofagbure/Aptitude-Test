const db = require("../models");

module.exports = {
    findAllUsers: function(req, res) {
      db.User
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAllProfiles: function(req, res) {
      db.UserProfile
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAllInterviews: function(req, res) {
      db.Interviews
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAUserID: function(req, res) {
      db.User
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAUserEmail: function(req, res) {
      db.User
        .findOne({ email: `${req.params.email}`})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAProfileEmail: function(req, res) {
      db.UserProfile
        .findOne({ email: `${req.params.email}`})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAnInterviewApplicant: function(req, res) {
      db.Interviews
        .findOne({ applicantEmail: `${req.params.email}`})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAnInterviewRecruiter: function(req, res) {
      db.Interviews
        .findOne({ recruiterEmail: `${req.params.email}`})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
};