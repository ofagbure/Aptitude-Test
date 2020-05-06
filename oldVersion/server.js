const express = require("express");
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const app = express();

const users = require("./config/orm.js");

const mostSecretVariable = "a3867715c256ce1213282df655c9033b0d32f025d6d604e66a7a14cbc75ce99c9f3b3707bd1456eb8145c75acc63cad1ef8538cc2a897138b31bd2146db80d2494e26186974aeed07bd4d01bea49f0a65cf5acefac6d8ba12422d28ab13771da7269cbf8f544875b2fb516d323966330aded50e339a10826bc8d23bc9295f148bc9b80d71b62b824f0ffcd10318283cde60bc834971955c519ecabe5508a073e";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: mostSecretVariable,
    saveUninitialized : true,
    resave: true
}));

// ░░░░░░░░░░░░░░░░░░░░
// ░    ░░░░    ░░░   ░
// ░█▀▀▄░░░▒█▀▀█░░░▀█▀▒
// ▒█▄▄█░░░▒█▄▄█░░░▒█░▒
// ▒█░▒█░░░▒█░░░░░░▄█▄▒
// ░░░░░░░░░░░░░░░░░░░░
// This can be moved to a different controller file
// Right now it's good for testing
app.get("/api/allusers", (req, res) => {
    users.allUsers( function (result) {
        res.send(result);
    });
});
app.get("/api/getUser", (req, res) => {
    users.selectAUser(req.query.email, function (result) {
        res.send(result);
    });
});
app.get("/api/allApplicants", (req, res) => {
    users.allApplicants( function (result) {
        res.send(result);
    });
});
app.get("/api/allRecruiters", (req, res) => {
    users.allRecruiters( function (result) {
        res.send(result);
    });
});
app.put("/api/addUser", (req, res) => {
    users.addUser(req.body.email, req.body.password, req.body.isRecruiter, function (result) {
        console.log('added user ' + JSON.stringify(result));
    });
    res.status(200).end();
});
app.put("/api/addPortfolio", (req, res) => {
    users.addPortfolio(req.body.firstName, req.body.lastName, req.body.city, req.body.willMove, req.body.profilePic, req.body.userDescription, req.body.website, req.body.userID, req.body.profback, function (result) {
        console.log('added portfolio');
    });
    res.status(200).end();
});
app.get("/api/userPortfolio", (req, res) => {
    users.selectPortfolio(req.query.userID, function (result) {
        res.send(result);
    });
});
app.get("/api/getInterviews", (req, res) => {
    users.getInterviews(req.query.recruiterID, function (result) {
        res.send(result);
    });
});

app.put("/api/addInterview", (req, res) => {
    users.addInterview(req.body.userID, req.body.interviewTime, req.body.interviewLocation, req.body.recruiterID, function (result) {
        console.log('added interview');
    });
    res.status(200).end();
});
app.get("/api/getUserInterview", (req, res) => {
    users.getUserInterview(req.query.userID, function (result) {
        res.send(result);
    });
});
app.put("/api/updatePortfolio", (req, res) => {
    users.updatePortfolio(req.body.firstName, req.body.lastName, req.body.profback, req.body.city, req.body.willMove, req.body.profilePic, req.body.userDescription, req.body.website, req.body.userID, function (result) {
        console.log('updated portfolio');
    });
    res.status(200).end();
});
app.get("/auth", (req, res) => {
    console.log(req.query)
    users.login(req.query.email, req.query.password, function (results) {
        console.log(results[0]);
        if(results.length > 0) {
            let rtrnRslts = {
                id: results[0].user_id,
                email: results[0].email,
                recruiter: results[0].recruiter
            };
            req.session.loggedin = true;
            req.session.email = results[0].email;
            req.session.id = results[0].user_id;
            req.session.recruiter = results[0].recruiter;
            res.send(rtrnRslts);
        } else {
            res.send(false);
        }
    });
});
app.get("/admin", (req, res) => {
    if(req.query.password === "password") {
        res.send(`
            <div class='container text-center' style='margin-top: 25vh; padding: 10px; border: 3px solid black; border-radius: 25px;'>
                <div class='row'>
                    <div class='col-md-12'>
                        <a style='float: right; padding: 0px 20px 20px;' href='/signin'>[X]</a>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <h1>Add A User!</h1>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <label> email <label>
                        <input type='text' id='email'></input>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <label> password <label>
                        <input type='text' id='password'></input>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <label> Recruiter Account? <label>
                        <select class="align-middle" multiple id='isRecruiter' size='2' style='overflow-y: hidden'>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select multiple>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <button id='addBtn'>Add</button>
                    </div>
                </div>
                <h1 id= 'added' style='opacity: 0; transition: all 200ms;'>Added</h1>
            </div>

    <script>

    const addBtn = document.getElementById('addBtn');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const isRecruiter = document.getElementById('isRecruiter');
    const added = document.getElementById('added');
    addBtn.style.transition = "all 200ms";

    addBtn.addEventListener("click", function() {
        let a = {
            email : email.value,
            password : password.value,
            isRecruiter : isRecruiter.value
        };
        if (email.value === "" || password.value === "" || isRecruiter.value === "" ) {
            setTimeout(function() {
                addBtn.style.color = "initial";
            },2000);
            addBtn.style.color = "red";
            return;
        }
        console.log("a has been set" + JSON.stringify(a));
        $.ajax("/api/addUser", {
            type: "PUT",
            data: a
        }).then( function () {
            email.value = "";
            password.value = "";
            added.style.opacity = 1;
            setTimeout(function() {
                added.style.opacity = 0;
            },2000);
        });
    });

    </script>

    `);
    } else {
        res.send('INVALID');
    }
});
app.get("/logout", (req, res) => {
    req.session.loggedin = false;
    res.redirect('/home');
});

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░     ░░    ░░    ░░ ░░░ ░░    ░░    ░░
// ░▒█▀▀▀█░▒█▀▀▀░▒█▀▀▄░▒█░░▒█░▒█▀▀▀░▒█▀▀▄░░
// ░░▀▀▀▄▄░▒█▀▀▀░▒█▄▄▀░░▒█▒█░░▒█▀▀▀░▒█▄▄▀░░
// ░▒█▄▄▄█░▒█▄▄▄░▒█░▒█░░░▀▄▀░░▒█▄▄▄░▒█░▒█░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// This can also be in a different file
// They're all together for developement for my brain-box

app.get('/home', function(req, res) {
    res.sendFile('public/index.html', {root: __dirname });
});

app.get('/jobs', function(req, res) {
    res.sendFile('public/jobs.html', {root: __dirname });
});

app.get('/quiz', function(req, res) {
    res.sendFile('public/quizindex.html', {root: __dirname });
});

app.get('/candidateportal', function(req, res) {
    if (req.session.loggedin) {
        res.sendFile('public/candidateportal.html', {root: __dirname });
	} else {
		res.redirect('/signin');
    }
});

app.get('/signin', function(req, res) {
    res.sendFile('public/signinpage.html', {root: __dirname });
});

app.get('*', function(req, res) {
    res.sendFile('public/index.html', {root: __dirname });
});

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});