const mongoose = require("mongoose")
const { Schema } = mongoose
const subjectSchema = new Schema({
    chapterID: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    subjectName: String,
    exerciseID: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]

})
module.exports = mongoose.model('Subject', subjectSchema)

