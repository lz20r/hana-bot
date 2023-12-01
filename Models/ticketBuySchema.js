const { model, Schema } = require("mongoose");

const { hongbaoBuy } = new Schema({
  guild: String,
  memberId: String,
  categoryID: String,
  closed: Boolean,
  open: Boolean,
  openBy: String,
});

module.exports = model("hbuy", hongbaoBuy);
