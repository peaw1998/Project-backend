const router = require("express").Router()
const _ = require("lodash")
const Notification = require("../model/Notification")

router.get("/api/notifications", (req, res) => {
      Notification.find({}, function(err, notifications) {
            res.send(notifications)
      })
})

router.get("/api/notification/:id", (req, res) => {
      Notification.findOne({ _id: req.params.id }, function(err, notification) {
            if (notification) {
                  res.send(notification)
            } else {
                  res.status(400).send("not found user")
            }
      })
})

router.post("/api/notification", (req, res) => {
      let instance = new Notification({
            notificationName: req.body.notificationName,
            content: req.body.content
      })
      instance.save(function(err, result) {
            if (err || !result) {
                  res.status(400).send(err)
            } else {
                  res.send(result)
            }
      })
})

router.put("/api/notification/:id", (req, res) => {
      let payload = _.pick(req.body, ["notificationName", "content"])

      Notification.findOneAndUpdate({ _id: req.params.id }, payload, function(
            err,
            notification
      ) {
            if (notification) {
                  res.send(notification)
            } else {
                  res.status(400).send("update error")
            }
      })
})

router.delete("/api/notification/:id", (req, res) => {
      Notification.findOneAndDelete({ _id: req.params.id }, function(
            err,
            result
      ) {
            if (result) {
                  res.send(result)
            } else {
                  res.status(400).send("delete error")
            }
      })
})

module.exports = router
