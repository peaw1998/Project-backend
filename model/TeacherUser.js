const mongoose = require("mongoose")
const { Schema } = mongoose

const teacherSchema = new Schema({
    teacherID: String,
    username: String,
    password: String,
    email: String,
    SubjectID: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
})

module.exports = mongoose.model('TeacherUser', teacherSchema)
