const router = require("express").Router()
const TeacherUser = require("../model/TeacherUser")
const bcrypt = require("bcrypt")
const jwt = require("jwt-simple")
const nodemailer = require("nodemailer")
const mail = require("../config/gmail")
const crypto = require("crypto")
const requireJWTAuth = require("../config/jwt")

//Teacher
router.get("/api/teachers", (req, res) => {
      TeacherUser.find({}, function (err, users) {
            res.send({ users: users })
      })
})

router.get("/api/teacher/:id", (req, res) => {
      TeacherUser.findOne({ _id: req.params.id }, function (err, user) {
            if (user) {
                  res.send(user)
            } else {
                  res.status(400).send("not found user")
            }
      })
})

router.post("/auth/teacher/login", (req, res) => {
      TeacherUser.findOne({ username: req.body.username }, function (
            err,
            user
      ) {
            if (user) {
                  bcrypt.compare(req.body.password, user.password, function (
                        err2,
                        res1
                  ) {
                        if (res1) {
                              res.send(
                                    jwt.encode(
                                          {
                                                username: req.body.username,
                                                role: "teacher",
                                          },
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
      TeacherUser.find({}, function (err, result) {
            if (
                  result.filter(
                        (teacher) =>
                              teacher.username === req.body.username ||
                              teacher.email === req.body.email
                  ).length === 0
            ) {
                  let instance = new TeacherUser({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        subjectID: [],
                  })
                  instance.save(function (err2, result2) {
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

router.post("/auth/teacher/forgetpassword", (req, res) => {
      TeacherUser.findOne({ email: req.body.email }, function (err, result) {
            if (result) {
                  let newPassword = crypto.randomBytes(4).toString("hex")
                  const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: mail,
                  })

                  let mailOptions = {
                        from: mail.user, // sender
                        to: req.body.email, // list of receivers
                        subject: "Password Changed", // Mail subject
                        html: `your new password is ${newPassword}`, // HTML body
                  }

                  transporter.sendMail(mailOptions, function (err2, info) {
                        if (err) return res.sendStatus(400)
                        else {
                              result.password = newPassword
                              result.save(function (err3, result3) {
                                    if (result3) {
                                          console.log(result3)
                                    } else {
                                          console.log(err3)
                                    }
                              })
                              return res.send("email sent")
                        }
                  })
            } else {
                  res.sendStatus(400)
            }
      })
})

router.put("/auth/teacher/changepassword", requireJWTAuth, (req, res) => {
      TeacherUser.findOne(
            {
                  username: jwt.decode(
                        req.headers.authorization.split(" ")[1],
                        "MY_SECRET_KEY"
                  ).username,
            },
            function (err, result) {
                  if (err || !result) {
                        return res.sendStatus(400)
                  } else {
                        if (req.body.password) {
                              result.password = req.body.password
                              result.save(function (err3, result3) {
                                    if (result3) {
                                          console.log(result3)
                                    } else {
                                          console.log(err3)
                                    }
                              })
                              return res.send("password changed")
                        } else {
                              return res.sendStatus(400)
                        }
                  }
            }
      )
})

router.get("/auth/teacher/profile", requireJWTAuth, (req, res) => {
      TeacherUser.findOne(
            {
                  username: jwt.decode(
                        req.headers.authorization.split(" ")[1],
                        "MY_SECRET_KEY"
                  ).username,
            },
            function (err, result) {
                  if (err || !result) {
                        return res.sendStatus(400)
                  } else {
                        res.send(result)
                  }
            }
      )
})

module.exports = router
