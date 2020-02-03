const express = require("express")
const mongoose = require("mongoose")
const app = express()

const _ = require('lodash')

const p24 = (n) => _.padStart(n, 24, '0')

mongoose.connect("mongodb+srv://maapeaw:maapeaw5500@cluster0-ix8xq.mongodb.net/test?retryWrites=true&w=majority")
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("h");
});
const LearnerUser = require('./LearnerUser')
const TeacherUser = require('./TeacherUser')
const Subject = require('./Subject')
const Chapter = require('./Chapter')
const Exercise = require('./Exercise')
app.use(express.json());
// require('./Mockup')
app.get("/", (req, res) => {
    res.send("test")
})

//Learner
app.get("/api/learners", (req, res) => {
    LearnerUser.find({}, function (err, users) {
        res.send({ users: users });
    });
})

app.get("/api/learner/:id", (req, res) => {
    LearnerUser.findOne({ _id: p24(req.params.id) }, function (err, user) {
        if (user) {
            res.send(user)
        } else {
            res.status(400).send("not found user")
        }
    });
})

//Teacher
app.get("/api/teachers", (req, res) => {
    TeacherUser.find({}, function (err, users) {
        res.send({ users: users });
    });
})

app.get("/api/teacher/:id", (req, res) => {
    TeacherUser.findOne({ _id: p24(req.params.id) }, function (err, user) {
        if (user) {
            res.send(user)
        } else {
            res.status(400).send("not found user")
        }
    });
})

//Subject
app.get("/api/subjects", (req, res) => {
    Subject.find({}, function (err, users) {
        res.send({ users: users });
    });
})

app.get("/api/subject/:id", (req, res) => {
    Subject.findOne({ _id: p24(req.params.id) }, function (err, user) {
        if (user) {
            res.send(user)
        } else {
            res.status(400).send("not found user")
        }
    });
})

//Chapter
app.get("/api/chapters", (req, res) => {
    Chapter.find({}, function (err, users) {
        res.send({ users: users });
    });
})

app.get("/api/chapter/:id", (req, res) => {
    Chapter.findOne({ _id: p24(req.params.id) }, function (err, user) {
        if (user) {
            res.send(user)
        } else {
            res.status(400).send("not found user")
        }
    });
})

//Exercise
app.get("/api/exercises", (req, res) => {
    Exercise.find({}, function (err, users) {
        res.send({ users: users });
    });
})

app.get("/api/exercise/:id", (req, res) => {
    Exercise.findOne({ _id: p24(req.params.id) }, function (err, user) {
        if (user) {
            res.send(user)
        } else {
            res.status(400).send("not found user")
        }
    });
})

app.post("/api/subject", (req, res) => {
    if (req.body.name) {
        Subject.create({
            subjectName: req.body.name
        })
        res.send("create success")
    }
    res.send("create error")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server on port:", PORT)
})






