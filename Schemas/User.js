const { Schema, model } = require('mongoose'); 
const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    lastDaily: {
        type: Number,
        required: false,
    },
    lastWork: {
        type: Number,
        required: false,
    },
    lastCrime: {
        type: Number,
        required: false,
    },
    lastRob: {
        type: Number,
        required: false,
    },
    lastFish: {
        type: Number,
        required: false,
    },
    lastMine: {
        type: Number,
        required: false,
    },
    lastSearch: {
        type: Number,
        required: false,
    },
    lastBet: {
        type: Number,
        required: false,
    },
    lastWeekly: {
        type: Number,
        required: false,
    },
    lastMonthly: {
        type: Number,
        required: false,
    },
    lastVote: {
        type: Number,
        required: false,
    },
});

module.exports = model('User', userSchema);