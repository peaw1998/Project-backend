const router = require('express').Router()

const Chapter = require("../model/Chapter")
//Chapter
router.get("/api/chapters", (req, res) => {
    Chapter.find({}, function(err, users) {
          res.send({ users: users })
    })
})

router.get("/api/chapter/:id", (req, res) => {
    Chapter.findOne({ _id: req.params.id }, function(err, user) {
          if (user) {
                res.send(user)
          } else {
                res.status(400).send("not found user")
          }
    })
})

module.exports = router