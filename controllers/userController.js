const db = require("../models");
const Q = require('q');

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
        .then(function(dbModel){
          
          let rData = {email: dbModel.email, id: dbModel._id, recruiter: dbModel.recruiter};
          res.json(rData);
        })
        .catch( function() {
          res.send(false) });
    },
    checkPassword: function(req, res) {
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
    localReg : function (email, password, recruiter = false) {
      var deferred = Q.defer();
      db.User
      .findOne({ email: email})
      .then(function (result) {
        if (null != result) {
          console.log("Email in use:", result.email);
          deferred.resolve(false); // email exists
        } else  {
          var newUser = new db.User({
            email: email,
            password: password,
            recruiter: recruiter
          });
          newUser.save(function (err) {
            if(err) return err;
          })
          deferred.resolve(newUser);
        }
      });
      return deferred.promise;
    },
    localAuth: function (email, password) {
    var deferred = Q.defer();
    db.User
      .findOne({ email: email})
      .then(function (result) {
        if (null == result) {
          deferred.resolve(false);
        }
        else {
          if (password === result.password) {
            deferred.resolve(result);
          } else {
            console.log('invalid password');
            deferred.resolve(false);
          }
        }
      });
      return deferred.promise;
    },
    updateProfile: function(email) {
      db.UserProfile
      .updateOne({email: email})
      .then(function(result) {
        return result;
      })
    },
    findAllApplicants: function(req, res) {
      db.User
        .find({ recruiter: false })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAllRecruiters: function(req, res) { 
      db.User
        .find({ recruiter: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAllRecruiterInterviews: function(req, res) {
      db.Interviews
      .find({ recruiterEmail: `${req.params.email}` })
      .then(dbModel => res.send(dbModel))
      .catch(err => res.status(422).json(err));
    }
};