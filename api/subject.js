const router = require("express").Router()
const Subject = require("../model/Subject")
const TeacherUser = require("../model/TeacherUser")
const LearnerUser = require("../model/LearnerUser")

//Subject
router.get("/api/subjects", (req, res) => {
      Subject.find({}, function (err, users) {
            res.send({ users: users })
      })
})

router.get("/api/subject/:id", (req, res) => {
      Subject.findOne({ _id: req.params.id }).populate('chapterID').exec(function (err, user) {
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
                  function (err, user) {
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
      Subject.findOneAndDelete({ _id: req.params.id }, function (err, result) {
            if (result) {
                  TeacherUser.where({ subjectID: req.params.id }).updateMany({ $pull: { subjectID: req.params.id } }, function (err, result1) {
                        if (err) {
                              res.sendStatus(400).send("delete error")
                        } else {
                              LearnerUser.where({ subjectID: req.params.id }).updateMany({ $pull: { subjectID: req.params.id } }, function (err, result2) {
                                    if (err) {
                                          res.sendStatus(400).send("delete error")
                                    } else {
                                          res.send(result2)
                                    }
                              })
                        }
                  })
            } else {
                  res.status(400).send("delete error")
            }
      })
})

module.exports = router
