const { Schema, model } = require("mongoose");
const economySchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  currencyName: String,
  currencyEmoji: String,
  currencyPerMsg: String,
});

console.log("MODEL: economySchema");
module.exports = model("economySchema", economySchema, "guildEconomySchema");