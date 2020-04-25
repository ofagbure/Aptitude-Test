const connection = require('../config/connection.js');

let orm = {
    allUsers: (cb) => {
        let queryString = "SELECT * FROM user;";
        connection.query(queryString, (err, result) => {
            if (err) { throw err; }
            console.log(`allUsers was called. Retrieved: ${JSON.stringify(result)}`)
            cb(result);
        });
    },
    allApplicants: (cb) => {
        let queryString = "SELECT * FROM user WHERE recruiter = false;";
        connection.query(queryString, (err, result) => {
            if (err) { throw err; }
            console.log(`allApplicants was called. Retrieved: ${JSON.stringify(result)}`)
            cb(result);
        });
    },
    allRecruiters: (cb) => {
        let queryString = "SELECT * FROM user WHERE recruiter = true;";
        connection.query(queryString, (err, result) => {
            if (err) { throw err; }
            console.log(`allRecruiters was called. Retrieved: ${JSON.stringify(result)}`)
            cb(result);
        });
    }
}


module.exports = orm;