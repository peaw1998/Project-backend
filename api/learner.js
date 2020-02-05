const router = require('express').Router()
const LearnerUser = require("../model/LearnerUser")
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

//Learner
router.get("/api/learners", (req, res) => {
    LearnerUser.find({}, function(err, users) {
          res.send({ users: users })
    })
})

router.get("/api/learner/:id", (req, res) => {
    LearnerUser.findOne({ _id: req.params.id }, function(err, user) {
          if (user) {
                res.send(user)
          } else {
                res.status(400).send("not found user")
          }
    })
})

router.get("/auth/learner/login" ,(req, res) => {
      LearnerUser.findOne({ username: req.body.username }, function(err, user) {
            if(user) {
                  bcrypt.compare(req.body.password, user.password, function(err, res1) {
                        if(res1) {
                              res.send(jwt.encode(req.body.username,"MY_SECRET_KEY"))
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