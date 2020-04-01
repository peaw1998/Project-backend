const mongoose = require("mongoose")
const { Schema } = mongoose

const notificationSchema = new Schema({
      notificationName: String,
      content: String
})

module.exports = mongoose.model("Notification", notificationSchema)
