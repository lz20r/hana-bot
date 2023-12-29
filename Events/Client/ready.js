const { ActivityType } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const client = require("../../index");

require("colors");

client.on("ready", async () => {

  console.log((
    "CLIENT STATUS ━━━━━━━━━━━━━━━━━━━━━━━┓".cyan))
  console.log("┃ ".cyan + `💭  ${client.user.username}: [INFO]  Ready`.bgCyan + " ┃".cyan);
  console.log(("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan))

  client.db = await require('../../kinakodb')(client)
  
    await mongoose.connect(config.mongopass, {
      useNewUrlParser: true, useUnifiedTopology: true
    });
  
    if (mongoose.connect) {
      console.log(("MONGODB CONECTION STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".cyan))
      console.log("┃ ".cyan + `💭  ${client.user.username}: [INFO]  Connected to MongoDB`.bgCyan + " ┃".cyan);
      console.log(("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan))
    }
  
  client.user.setPresence({
    activities: [
      {
        name: `${client.user.username}'s 24/7 in  canal/s`,
        type: ActivityType.Custom,
      },
    ],
    status: "idle",
  });
  const statusArray = [
    `RAM：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} %`,
    `Today is ${String(new Date()).split(" ", 5).join(" ")}`,
    `${client.user.username} active in ${client.guilds.cache.size} server/s`,
    `${client.user.username} active in ${client.channels.cache.size} canal/s`,
    `${client.user.username} looking ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} user/s`,
  ];
  let index = 0;
  const randTime = Math.floor(Math.random() * 5) + 1;
  setTimeout(() => {
    setInterval(() => {
      if (index === statusArray.length) index = 0;
      const status = statusArray[index];
      client.user.setPresence({
        activities: [{ name: status, type: ActivityType.Custom }],
        status: "idle",
      });
      index++;
    }, 6 * 1000);
  }, randTime);

});
