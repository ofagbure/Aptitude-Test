const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

const users = require("./config/orm.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This can be moved to a different controller file
// Right now it's good for testing
app.get("/api/allusers", (req, res) => {
    users.allUsers( function (result) {
        let users = [];
        for(var i = 0; i < result.length; i++) {
            users += 
                `<p>user_id: ${result[i].user_id}</p>
                <p>email: ${result[i].email}</p>
                <p>usr_pass: ${result[i].usr_pass}</p>
                <p>recruiter? ${result[i].recruiter}</p>
                --------------------------------------------
                `;
        }
        res.send(users);
    });
});

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});