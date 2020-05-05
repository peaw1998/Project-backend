const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema(
  {
    username: Schema.Types.String,
    score: Schema.Types.Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
