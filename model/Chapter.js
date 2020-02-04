const mongoose = require("mongoose")
const { Schema } = mongoose

const chapterSchema = new Schema({
    chapterName: String,
    content: String,
})


module.exports = mongoose.model('Chapter', chapterSchema)
