const mongoose = require("mongoose")
const { Schema } = mongoose


const exerciseSchema = new Schema({
    type: String,
    preTest: Boolean,
    postTest: Boolean,
    Question: Schema.Types.Mixed
})

module.exports = mongoose.model('Exercise', exerciseSchema)
