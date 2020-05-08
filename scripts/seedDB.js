const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/aptitudedb"
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
        email: "testrecruiter1@test.com",
        password: "password",
        recruiter: true
    },
    {
        email: "testrecruiter2@test.com",
        password: "password",
        recruiter: true
    },
    {
        email: "testrecruiter3@test.com",
        password: "password",
        recruiter: true
    },
    {
        email: "testrecruiter4@test.com",
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
        lsatName: "LastOne",
        email: "testapplicant1@test.com",
        profileImg: "",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description one.",
        city: "Nowhere",
        willMove: false,
        testResults: "Human Resources"
    },
    {
        firstName: "FirstTwo",
        lsatName: "LastTwo",
        email: "testapplicant2@test.com",
        profileImg: "",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description two.",
        city: "Nowhere",
        willMove: false,
        testResults: "Risk & Quantitative Analysis"
    },
    {
        firstName: "FirstThree",
        lsatName: "LastThree",
        email: "testapplicant3@test.com",
        profileImg: "",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description three.",
        city: "Nowhere",
        willMove: false,
        testResults: "Sales & Relationship Management"
    },
    {
        firstName: "FirstFour",
        lsatName: "LastFour",
        email: "testapplicant4@test.com",
        profileImg: "",
        profileBackground: 1,
        website: "https://www.google.com",
        description: "This is description four.",
        city: "Nowhere",
        willMove: false,
        testResults: "Finance"
    },
    {
        firstName: "FirstFive",
        lsatName: "LastFive",
        email: "testapplicant5@test.com",
        profileImg: "",
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
        recruiterEmail: "testrecruiter1@test.com",
        applicantEmail: "testapplicant1@test.com",
        interviewTime: "2020-05-19T21:42",
        interviewLocation: "Chilli's"
    },
    {
        recruiterEmail: "testrecruiter2@test.com",
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
