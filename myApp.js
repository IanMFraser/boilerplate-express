let express = require("express");
let app = express();
let bodyParser = require("body-parser");
require("dotenv").config();

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    let results = `${req.method} ${req.path} - ${req.ip}`;
    console.log(results);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.post("/name", function (req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: req.time,
        });
    }
);

app.get("/json", (req, res) => {
    let myMessage = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ message: myMessage.toUpperCase() });
    }
    res.json({ message: myMessage });
});

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
    let { first: firstName, last: lastName } = req.query;
    res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;
