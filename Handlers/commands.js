const { Collection } = require("discord.js");
const { getFiles } = require("./getFiles");
require("colors");
module.exports = async (client) => {

  client.commands = new Collection(); 
  client.slashcommands = new Collection();
  
  const commandFiles = getFiles("Comandos"); 
  const slashcommandsFiles = getFiles("Commands"); 

  for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.name, command);
  }

  for (const file of slashcommandsFiles) {
    const slash = require(file);
    client.slashcommands.set(slash.data.name, slash);
  }
  console.log(("PREFIX COMMANDS STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".cyan))
    console.log("┃ ".cyan + `💭  Kinako (きなこ): [情報] ${commandFiles.length} コマンドプレフィックスがロードされました`.magenta+"┃".cyan); 
    console.log("┃ ".cyan + `💭  Kinako (きなこ): [INFO] ${commandFiles.length} Prefix loaded`.bold+"                           ┃".cyan); 
    console.log(("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan))

  };
