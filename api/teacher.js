const router = require('express').Router()
const TeacherUser = require("../model/TeacherUser")

//Teacher
router.get("/api/teachers", (req, res) => {
    TeacherUser.find({}, function(err, users) {
          res.send({ users: users })
    })
})

router.get("/api/teacher/:id", (req, res) => {
    TeacherUser.findOne({ _id: req.params.id }, function(err, user) {
          if (user) {
                res.send(user)
          } else {
                res.status(400).send("not found user")
          }
    })
})

module.exports = router