const { Schema, model } = require("mongoose");

const level = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 100,
  },
});

module.exports = model("lvl", level);
