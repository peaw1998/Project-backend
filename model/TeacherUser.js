const mongoose = require("mongoose")
const { Schema } = mongoose

const teacherSchema = new Schema({
    username: String,
    password: String,
    email: String,
    subjectID: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
})

module.exports = mongoose.model('TeacherUser', teacherSchema)
