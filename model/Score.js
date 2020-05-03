const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  AllScore: Schema.Types.Mixed,
});

module.exports = mongoose.model("Score", scoreSchema);
