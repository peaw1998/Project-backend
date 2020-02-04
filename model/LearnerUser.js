const mongoose = require("mongoose")
const { Schema } = mongoose

const learnerSchema = new Schema({
    username: String,
    password: String,
    email: String,
    subjectID: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
})

module.exports = mongoose.model('LearnerUser', learnerSchema)
