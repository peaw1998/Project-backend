const router = require('express').Router()
const Exercise = require("../model/Exercise")

//Exercise
router.get("/api/exercises", (req, res) => {
    Exercise.find({}, function(err, users) {
          res.send({ users: users })
    })
})

router.get("/api/exercise/:id", (req, res) => {
    Exercise.findOne({ _id: p24(req.params.id) }, function(err, user) {
          if (user) {
                res.send(user)
          } else {
                res.status(400).send("not found user")
          }
    })
})

module.exports = router