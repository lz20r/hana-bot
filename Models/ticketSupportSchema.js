const { model, Schema } = require("mongoose");

const hongbaoSupport = new Schema({
  guildId: String,
  membersId: Array,
  channelId: String,
  closed: Boolean,
  open: Boolean,
  openBy: String,
});

module.exports = model("hsupport", hongbaoSupport);
