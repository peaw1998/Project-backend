const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require('bcrypt');

const teacherSchema = new Schema({
    username: String,
    password: String,
    email: String,
    subjectID: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
})

teacherSchema.pre('save', function(next) {
    var teacher = this
    bcrypt.hash(this.password, 3, function(err, hash) {
        teacher.password = hash
        next()
      });
})

module.exports = mongoose.model('TeacherUser', teacherSchema)
