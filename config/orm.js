const connection = require('../config/connection.js');

let orm = {
    allUsers: (cb) => {
        let queryString = "SELECT * FROM user;";
        connection.query(queryString, (err, result) => {
            if (err) { throw err; }
            console.log(`Select all was called. Retrieved: ${JSON.stringify(result)}`)
            cb(result);
        });
    },
    allApplicants: (cb) => {
        let queryString = "SELECT * FROM user WHERE recruiter = false;";
        connection.query(queryString, (err, result) => {
            if (err) { throw err; }
            console.log(`Select all was called. Retrieved: ${JSON.stringify(result)}`)
            cb(result);
        });
    },
}


module.exports = orm;