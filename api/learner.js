const router = require('express').Router()
const LearnerUser = require("../model/LearnerUser")

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

module.exports = router