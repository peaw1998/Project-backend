const router = require("express").Router()
const _ = require("lodash")
const Chapter = require("../model/Chapter")
const Subject = require("../model/Subject")
//Chapter
router.get("/api/chapters", (req, res) => {
      Chapter.find({}, function (err, users) {
            res.send({ users: users })
      })
})

router.get("/api/chapter/:id", (req, res) => {
      Chapter.findOne({ _id: req.params.id }, function (err, user) {
            if (user) {
                  res.send(user)
            } else {
                  res.status(400).send("not found user")
            }
      })
})

router.get("/api/chapters/subject/:id", (req, res) => {
      Subject.findOne({ _id: req.params.id })
            .populate("chapterID")
            .exec(function (err, chapters) {
                  if (err || !chapters) {
                        res.send([])
                  } else {
                        res.send(chapters.chapterID)
                  }
            })
})

router.post("/api/chapter", (req, res) => {
      let instance = new Chapter({
            chapterName: req.body.chapterName,
            content: req.body.content
      })
      instance.save(function (err, result) {
            if (err || !result) {
                  res.status(400).send(err)
            } else {
                  let newChapter = result.toObject()
                  let id = newChapter._id
                  Subject.findOneAndUpdate(
                        { _id: req.body.subjectId },
                        { $push: { chapterID: id } },
                        function (err1, result1) {
                              if (result1) {
                                    res.send("Create Success")
                              } else {

                                    res.status(400).send(err1)
                              }
                        }
                  )
            }
      })
})

router.put("/api/chapter/:id", (req, res) => {
      let payload = _.pick(req.body, ["chapterName", "content"])

      Chapter.findOneAndUpdate({ _id: req.params.id }, payload, function (
            err,
            user
      ) {
            if (user) {
                  res.send("update success")
            } else {
                  res.status(400).send("update error")
            }
      })
})

router.delete("/api/chapter/:id", (req, res) => {
      Chapter.findOneAndDelete({ _id: req.params.id }, function (err, result) {
            if (result) {
                  Subject.findOneAndUpdate(
                        { chapterID: result._id },
                        { $pull: { chapterID: result._id } },
                        function (err1, result1) {
                              if (result1) {
                                    res.send("Delete Success")
                              } else {

                                    res.status(400).send(err1)
                              }
                        }
                  )
            } else {
                  res.status(400).send("delete error")
            }
      })
})

module.exports = router
