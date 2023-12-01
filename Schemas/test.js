const { model, Schema } = require("mongoose");

let texting = new Schema({
  GuidID: String,
  UsserID: String,
});

module.exports = model(`texting`, texting);
