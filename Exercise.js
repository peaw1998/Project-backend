const mongoose = require("mongoose")
const { Schema } = mongoose


const exerciseSchema = new Schema({
    exerciseID: String,
    type: String,
    preTest: Boolean,
    postTest: Boolean,
    Question: { any: Schema.Types.Mixed },


})

module.exports = mongoose.model('Exercise', exerciseSchema)
