const mongoose = require("mongoose")
const { Schema } = mongoose

const chapterSchema = new Schema({
    chapterID: String,
    chapterName: String,
    content: String,
})


module.exports = mongoose.model('Chapter', chapterSchema)
