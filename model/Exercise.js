const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  type: String,
  preTest: Boolean,
  postTest: Boolean,
  scoreID: [{ type: Schema.Types.ObjectId, ref: "Score", default: [] }],
  Question: Schema.Types.Mixed,
});

module.exports = mongoose.model("Exercise", exerciseSchema);
