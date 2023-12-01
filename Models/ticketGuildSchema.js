const { model, Schema } = require("mongoose");

const hongbaoSetup = new Schema({
  guildId: String,
  channelId: String,
  categorySoporte: String,
  categoryBuy: String,
  channelLogs: String,
  handlerRol: String,
  everyoneRol: String,
});

module.exports = model("hongbao", hongbaoSetup);
