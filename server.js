const express = require("express");
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const app = express();

const users = require("./config/orm.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
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
        res.send(dataVomitter(result));
    });
});
app.get("/api/allApplicants", (req, res) => {
    users.allApplicants( function (result) {
        res.send(dataVomitter(result));
    });
});
app.get("/api/allRecruiters", (req, res) => {
    users.allRecruiters( function (result) {
        res.send(dataVomitter(result));
    });
});
app.put("/api/addUser", (req, res) => {
    users.addUser(req.body.email, req.body.password, req.body.isRecruiter, function (result) {
        console.log('put path');
    });
});
app.get("/auth", (req, res) => {
    console.log(req.query)
    users.login(req.query.email, req.query.password, function (results) {
        console.log(results.length);
        if(results.length > 0) {
            req.session.loggedin = true;
            req.session.email = req.query.email;
            console.log(req.session);
            res.redirect('/home');
        } else {
            console.log('wrong pass or something bruh')
        }
    });
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
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.email + '!');
	} else {
		res.redirect('/login');
	}
});

app.get("/addUser", (req, res) => {
    res.send(`
    <h1>Add A User!</h1>
    <label>email<label>
    <input type='text' id='email'></input>
    <label>password<label>
    <input type='text' id='password'></input>
    <label>are you a recruiter?<label>
    <select multiple id='isRecruiter'>
        <option value='1'>Yes</option>
        <option value='0'>No</option>
    </select multiple>
    <button id='addBtn'>Add</button>
    <br>
    <a href='/doesntmatterwhatshere'>login</a>
    <script>

    var jqueryImport = document.createElement("script");
    jqueryImport.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
    document.head.appendChild(jqueryImport);

    const addBtn = document.getElementById('addBtn');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const isRecruiter = document.getElementById('isRecruiter');

    addBtn.addEventListener("click", function() {
        let a = {
            email : email.value,
            password : password.value,
            isRecruiter : isRecruiter.value
        };
        console.log("a has been set" + JSON.stringify(a));
        $.ajax("/api/addUser", {
            type: "PUT",
            data: a
        }).then( function () {
            console.log("here");
        });
    });

    </script>

    `);

});

app.get('*', function(req, res) {
    res.send(`
    <h1>Login!</h1>
    <label>email<label>
    <input type='text' id='email'></input>
    <label>password<label>
    <input type='text' id='password'></input>
    <button id='loginBtn'>Login</button>
    <br>
    <a href='/addUser'>create account</a>

    <script>

    var jqueryImport = document.createElement("script");
    jqueryImport.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
    document.head.appendChild(jqueryImport);

    const loginBtn = document.getElementById('loginBtn');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    loginBtn.addEventListener("click", function() {
        $.ajax({
            url: "/auth",
            type: "GET",
            data: {
                email : email.value,
                password : password.value
            },
            success: function(response) {
                console.log(response);
                document.cookie.email = response[0].email;
                document.cookie.loggedIn = true;
                window.location = "/home";
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    </script>
    `);
});
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});


//This is just a function to iterate through recieved DB info
function dataVomitter(item) {
    var result = '';
    for(var i = 0; i < item.length; i++) {
        for (var key in item[i]) {
            if (item[i].hasOwnProperty(key)) {
                result += `<p>${key}: ${item[i][key]}</p>`;
            }
        }
        result += "<p>-------------</p>";
    }
    return result;
}