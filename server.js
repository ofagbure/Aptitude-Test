const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

express.Router().get("/", (req, res) => {
    burger.allUsers( function (result) {
        let users = [];
        for(var i = 0; i < result.length; i++) {
            users += result[i];
        }
        res.send(users);
    });
});

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});