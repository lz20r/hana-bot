const mongoose = require("mongoose");

const echoSchema = mongoose.Schema({
    userID: { tyoe: String, required: true, unique: true },
    dinero: { type: Number, default: 1000 }, 
    banco: { type: Number, default: 100 },
})

const model = mongoose.model("economía", echoSchema);

module.exports = model;