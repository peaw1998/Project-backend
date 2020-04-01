const router = require("express").Router()
const TeacherUser = require("../model/TeacherUser")
const bcrypt = require("bcrypt")

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

router.get("/auth/teacher/login", (req, res) => {
      TeacherUser.findOne({ username: req.body.username }, function(err, user) {
            if (user) {
                  bcrypt.compare(req.body.password, user.password, function(
                        err,
                        res1
                  ) {
                        if (res1) {
                              res.send(
                                    jwt.encode(
                                          req.body.username,
                                          "MY_SECRET_KEY"
                                    )
                              )
                        } else {
                              res.sendStatus(401)
                        }
                  })
            } else {
                  res.sendStatus(401)
            }
      })
})

router.post("/auth/teacher/signup", (req, res) => {
      TeacherUser.find({}, function(err, result) {
            if (
                  result.filter(
                        teacher =>
                              teacher.username === req.body.username ||
                              teacher.email === req.body.email
                  ).length === 0
            ) {
                  let instance = new TeacherUser({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        subjectID: []
                  })
                  instance.save(function(err2, result2) {
                        if (err2 || !result2) {
                              res.sendStatus(400)
                        } else {
                              res.send("signup success")
                        }
                  })
            } else {
                  res.status(400).send("duplicate username or password")
            }
      })
})

module.exports = router
