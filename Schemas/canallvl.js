const mongoose = require("mongoose");

const clvl = mongoose.Schema({
  Guild: String,
  Channel: String,
});

module.exports = mongoose.model("clvl", clvl);
