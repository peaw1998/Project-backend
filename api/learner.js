const router = require("express").Router()
const LearnerUser = require("../model/LearnerUser")
const bcrypt = require("bcrypt")
const jwt = require("jwt-simple")
const nodemailer = require("nodemailer")
const mail = require("../config/gmail")
const crypto = require("crypto")
const requireJWTAuth = require("../config/jwt")

//Learner
router.get("/api/learners", (req, res) => {
      LearnerUser.find({}, function (err, users) {
            res.send({ users: users })
      })
})

router.get("/api/learner/:id", (req, res) => {
      LearnerUser.findOne({ _id: req.params.id }, function (err, user) {
            if (user) {
                  res.send(user)
            } else {
                  res.status(400).send("not found user")
            }
      })
})

router.post("/auth/learner/login", (req, res) => {
      LearnerUser.findOne({ username: req.body.username }, function (
            err,
            user
      ) {
            if (user) {
                  bcrypt.compare(req.body.password, user.password, function (
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

router.post("/auth/learner/signup", (req, res) => {
      LearnerUser.find({}, function (err, result) {
            if (
                  result.filter(
                        (learner) =>
                              learner.username === req.body.username ||
                              learner.email === req.body.email
                  ).length === 0
            ) {
                  let instance = new LearnerUser({
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

router.post("/auth/learner/forgetpassword", (req, res) => {
      LearnerUser.findOne({ email: req.body.email }, function (err, result) {
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

router.put("/auth/learner/changepassword", requireJWTAuth, (req, res) => {
      LearnerUser.findOne(
            {
                  username: jwt.decode(
                        req.headers.authorization.split(" ")[1],
                        "MY_SECRET_KEY"
                  ),
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

module.exports = router
