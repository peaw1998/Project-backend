const router = require('express').Router()
const TeacherUser = require("../model/TeacherUser")
const bcrypt = require('bcrypt')

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

router.get("/auth/teacher/login" ,(req, res) => {
      TeacherUser.findOne({ username: req.body.username }, function(err, user) {
            if(user) {
                  bcrypt.compare(req.body.password, user.password, function(err, res1) {
                        if(res1) {
                              res.send("login success")
                        } else {
                              res.sendStatus(401)           
                        }
                    })
            } else {
                  res.sendStatus(401)
            }
      })
})

module.exports = router