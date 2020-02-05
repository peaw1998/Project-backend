const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require('bcrypt');

const learnerSchema = new Schema({
    username: String,
    password: String,
    email: String,
    subjectID: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
})

learnerSchema.pre('save', function(next) {
    var learner = this
    bcrypt.hash(this.password, 3, function(err, hash) {
        learner.password = hash
        next()
      });
})

module.exports = mongoose.model('LearnerUser', learnerSchema)
