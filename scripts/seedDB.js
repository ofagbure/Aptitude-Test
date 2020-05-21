const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(// "mongodb://localhost/choober"
    "mongodb://heroku_bbwcnjd8:273qhmfvqq2jhakc5lc4s0b5me@ds229722.mlab.com:29722/heroku_bbwcnjd8"
);

const userSeed = [
    {
        email: "testapplicant1@test.com",
        password: "password",
        recruiter: false
    },
    {
        email: "testapplicant2@test.com",
        password: "password",
        recruiter: false
    },
    {
        email: "testapplicant3@test.com",
        password: "password",
        recruiter: false
    },
    {
        email: "testapplicant4@test.com",
        password: "password",
        recruiter: false
    },
    {
        email: "testapplicant5@test.com",
        password: "password",
        recruiter: false
    },
    {
        email: "testapplicant6@test.com",
        password: "password",
        recruiter: false
    },
    {
        email: "john@company.com",
        password: "password",
        recruiter: true
    },
    {
        email: "abe@company.com",
        password: "password",
        recruiter: true
    },
    {
        email: "betty@company.com",
        password: "password",
        recruiter: true
    },
    {
        email: "niccage@test.com",
        password: "password",
        recruiter: true
    },
    {
        email: "testrecruiter5@test.com",
        password: "password",
        recruiter: true
    },
];

const profileSeed = [
    {
        firstName: "FirstOne",
        lastName: "LastOne",
        email: "testapplicant1@test.com",
        profileImg: "defaultImage",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description one.",
        city: "Nowhere",
        willMove: false,
        testResults: "Human Resources"
    },
    {
        firstName: "FirstTwo",
        lastName: "LastTwo",
        email: "testapplicant2@test.com",
        profileImg: "defaultImage",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description two.",
        city: "Nowhere",
        willMove: false,
        testResults: "Risk & Quantitative Analysis"
    },
    {
        firstName: "FirstThree",
        lastName: "LastThree",
        email: "testapplicant3@test.com",
        profileImg: "defaultImage",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description three.",
        city: "Nowhere",
        willMove: false,
        testResults: "Sales & Relationship Management"
    },
    {
        firstName: "FirstFour",
        lastName: "LastFour",
        email: "testapplicant4@test.com",
        profileImg: "defaultImage",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description four.",
        city: "Nowhere",
        willMove: false,
        testResults: "Finance"
    },
    {
        firstName: "FirstFive",
        lastName: "LastFive",
        email: "testapplicant5@test.com",
        profileImg: "defaultImage",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description five.",
        city: "Nowhere",
        willMove: false,
        testResults: "Strategic Initiatives & Business Management"
    },
];

const interviewSeed = [
    {
        recruiterEmail: "Adam@company.com",
        applicantEmail: "testapplicant1@test.com",
        interviewTime: "2020-05-19T21:42",
        interviewLocation: "Chilli's"
    },
    {
        recruiterEmail: "Abe@company.com",
        applicantEmail: "testapplicant2@test.com",
        interviewTime: "2020-05-19T22:42",
        interviewLocation: "Chilli's"
    }
];

db.User
    .deleteMany({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        profile();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});

function profile() {
    db.UserProfile
    .deleteMany({})
    .then(() => db.UserProfile.collection.insertMany(profileSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        interviews();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
}

function interviews() {
    db.Interviews
    .deleteMany({})
    .then(() => db.Interviews.collection.insertMany(interviewSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
}
