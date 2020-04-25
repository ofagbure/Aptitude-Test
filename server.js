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