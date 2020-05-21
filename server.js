const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const routes = require("./routes");
// const session = require("express-session");
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./models");

// app.use(express.static("client/build"));
app.use(express.static("public"));
// app.use(session({
//   secret: "cats",
//   resave: true,
//   saveUninitialized: true,
// }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://heroku_bbwcnjd8:273qhmfvqq2jhakc5lc4s0b5me@ds229722.mlab.com:29722/heroku_bbwcnjd8",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

/*    

ooo.     .oPYo.      .oPYo.                  o              
8  `8.   8   `8      8   `8                  8              
8   `8  o8YooP'     o8YooP'  .oPYo.  o    o o8P .oPYo.  .oPYo. 
8    8   8   `b      8   `b  8    8  8    8  8  8oooo8  Yb..   
8   .P   8    8      8    8  8    8  8    8  8  8.        'Yb. 
8ooo'    8oooP'      8    8  `YooP'  `YooP'  8  `Yooo'  `YooP' 

*/

app.get('/api/allUsers', function (req, res) {
  db.User
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get('/api/allProfiles', function (req, res) {
  db.UserProfile
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get('/api/allRecruiters', function (req, res) {
  db.User
    .find({ recruiter: true })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

app.get('/api/allApplicants', function (req, res) {
  db.User
    .find({ recruiter: false })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

app.get('/api/allInterviews', function (req, res) {
  db.Interviews
    .find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post('/api/checkForApplicantInterview', function (req, res) {
  db.Interviews
    .find({ applicantEmail: `${req.body.email}` })
    .then(dbModel => res.send(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post('/api/allInterviewsOfOne', function (req, res) {
  db.Interviews
    .find({ recruiterEmail: `${req.body.email}` })
    .then(dbModel => res.send(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post('/api/profile', function (req, res) {
  db.UserProfile
    .findOne({ email: `${req.body.email}` })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});
/*
            firstName: firstName.value,
            lastName: lastName.value,
            profilePic: profilePic.value,
            website: website.value,
            userDescription: userDescription.value,
            city: city.value,
            willMove: yesCheckbox.checked,
            email: email


*/

app.post('/updateTestResults', function (req, res) {
  let filter = {
    email: req.body.email
  }
  let update = {
    testResults: req.body.testResults
  }
  db.UserProfile.findOneAndUpdate(filter, update, {
    returnOriginal: false
  }, function (err, results) {
    if (err) { res.send(err) }
    res.send(results);
  })
});

app.post('/updateUser', function (req, res) {
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
  }, function (err, results) {
    if (err) { res.send(err) }
    res.send(results);
  })
});

app.post('/addProfile', function (req, res) {
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

app.post('/addInterview', function (req, res) {

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

app.post('/api/newRecruiter', function (req, res) {
  db.User
    .findOne({ email: `${req.body.email}` })
    .then(function (dbModel) {
      if (dbModel === null) {
        let newUser = {
          email: `${req.body.email}`,
          password: `${req.body.email}`,
          recruiter: true
        }
        const FreshUser = new db.User(newUser);
        FreshUser.save(function (err) {
          if (err) { return res.send(err); }
          res.send(true);
        });
      } else {
        res.send('Email already in use');
      }
    })

});

app.post('/api/newUser', function (req, res) {
  db.User
    .findOne({ email: `${req.body.email}` })
    .then(function (dbModel) {
      if (dbModel === null) {
        let newUser = {
          email: `${req.body.email}`,
          password: `${req.body.email}`,
          recruiter: false
        }
        const FreshUser = new db.User(newUser);
        FreshUser.save(function (err) {
          if (err) { return res.send(err); }
          res.send(true);
        });
      } else {
        res.send('Email already in use');
      }
    })


});

app.post('/api/login/', function (req, res) {
  db.User
    .findOne({ email: `${req.body.email}` })
    .then(function (dbModel) {
      if (dbModel === null) {
        return res.json(false);
      }
      if (dbModel.password === req.body.password) {
        let response = {
          email: `${dbModel.email}`,
          recruiter: dbModel.recruiter
        }
        res.json(response);
      } else {
        res.json(false);
      }
    });
});

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('/', function (req, res) {
    const path = require('path');
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT);