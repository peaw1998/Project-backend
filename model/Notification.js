const mongoose = require("mongoose")
const { Schema } = mongoose

const notificationSchema = new Schema(
      {
            notificationName: String,
            content: String,
      },
      { timestamps: true }
)

module.exports = mongoose.model("Notification", notificationSchema)
