const router = require("express").Router()
const Subject = require("../model/Subject")

//Subject
router.get("/api/subjects", (req, res) => {
      Subject.find({}, function(err, users) {
            res.send({ users: users })
      })
})

router.get("/api/subject/:id", (req, res) => {
      Subject.findOne({ _id: req.params.id }, function(err, user) {
            if (user) {
                  res.send(user)
            } else {
                  res.status(400).send("not found user")
            }
      })
})

router.post("/api/subject", (req, res) => {
      if (req.body.name) {
            Subject.create({
                  subjectName: req.body.name
            })
            res.send("create success")
      } else {
            res.send("create error")
      }
})

router.put("/api/subject/:id", (req, res) => {
      if (req.body.name) {
            Subject.findOneAndUpdate(
                  { _id: req.params.id },
                  { subjectName: req.body.name },
                  function(err, user) {
                        if (user) {
                              res.send("update success")
                        } else {
                              res.status(400).send("update error")
                        }
                  }
            )
      } else {
            res.status(400).send("name is required")
      }
})

router.delete("/api/subject/:id", (req, res) => {
      Subject.findOneAndDelete({ _id: req.params.id }, function(err, user) {
            if (user) {
                  res.send("delete success")
            } else {
                  res.status(400).send("delete error")
            }
      })
})

module.exports = router
