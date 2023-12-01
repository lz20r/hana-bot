const client = require("../../index");
const Discord = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");

const manager = new GiveawaysManager(client, {
  storage: "./Json/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "Random",
    embedColorEnd: "Red",
    reaction: "🎉"
  }

  
});
client.giveaways = manager;