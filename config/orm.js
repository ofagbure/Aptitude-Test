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
            console.log(`allRecruiters was called. Retrieved: ${JSON.stringify(result)}`);
            console.log(cb.toString());
            cb(result);
        });
    },
    addUser: (email, password, isRecruiter, cb) => {
        let queryString = "INSERT INTO user ( email, usr_pass, recruiter ) VALUES (?, ?, ?)";
        connection.query(queryString, [email, password, isRecruiter], (err, result) => {
            if (err) { throw err; }
            console.log(`Insert one was called.`);
            cb(result);
          });
          
    },
    login: (email, password, cb) => {
        let queryString = "SELECT * FROM user WHERE email = ? AND usr_pass = ?";
        connection.query(queryString, [email, password], (err, results) => {
            if (err) { throw err; }
            console.log('log in');
            cb(results);
        });
    },
    selectAUser: (email, cb) => {
        let queryString = "SELECT * FROM user WHERE email = ?";
        connection.query(queryString, [email], (err, result) => {
            if (err) { throw err; }
            console.log(`selectAUser was called. Retrieved: ${JSON.stringify(result)}`)
            cb(result);
        });
    },
    addPortfolio: (firstName, lastName, city, willMove, profilePic, userDescription, website, userID, profback) => {
        let queryString = "INSERT INTO userprofile ( profile_img, first_name, last_name, website, descrip, city, willmove, user_id, profback ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(queryString, [profilePic, firstName, lastName, website, userDescription, city, willMove, userID, profback], (err, result) => {
            if (err) { throw err; }
            console.log(`portfolio was added`);
            console.log(result);
        });
    },
    selectPortfolio: (userID, cb) => {
        let queryString = "SELECT * FROM userprofile WHERE user_id = ?";
        connection.query(queryString, [userID], (err, result) => {
            if (err) { throw err; }
            console.log(`selectPortfolio was called. Retrieved: ${JSON.stringify(result)}`);
            cb(result);
        });
    },
    updatePortfolio: (firstName, lastName, profback, city, willMove, profilePic, userDescription, website, userID) => {
        let queryString = "UPDATE userprofile SET profile_img = ?, first_name = ?, last_name = ?, profback = ?, website = ?, descrip = ?, city = ?, willmove = ? WHERE user_id = ?";
        connection.query(queryString, [profilePic, firstName, lastName, profback, website, userDescription, city, willMove, userID], (err, result) => {
            if (err) { throw err; }
            console.log('Profile Updated!');
            console.log(result);
        });
    },
    addInterview:(userID, interviewTime, interviewLocation, recruiterID) => {
        let queryString = "INSERT INTO interviews (user_id, interview_time, interview_location, recruiter_id) VALUES (?, ?, ?, ?)";
        connection.query(queryString, [userID, interviewTime, interviewLocation, recruiterID], (err, result) => {
            if (err) { throw err; }
            console.log(`Inserted an interview`);
        });
    },
    getInterviews:(recruiterID, cb) => {
        let queryString = "SELECT * FROM interviews WHERE recruiter_id = ?";
        connection.query(queryString, [recruiterID], (err, result) => {
            if (err) { throw err; }
            console.log(`select interviews (by recruiter id) was called. Retrieved: ${JSON.stringify(result)}`);
            cb(result);
        });
    },
    getUserInterview:(userID, cb) => {
        let queryString = "SELECT * FROM interviews WHERE user_id = ?";
        connection.query(queryString, [userID], (err, result) => {
            if (err) { throw err; }
            console.log(`select interviews (by user id) was called. Retrieved: ${JSON.stringify(result)}`);
            cb(result);
        });
    },
}


module.exports = orm;