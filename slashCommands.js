const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { clientId, token } = require("./config.json");

const commands = [];

const slashcommandsFiles = fs.readdirSync(`./Commands`).forEach((subcarpetas) => {
  const slashcommandsFiles = fs.readdirSync(`./Commands/${subcarpetas}`).filter((file) => file.endsWith("js"));

  for (const file of slashcommandsFiles) {
    const slash = require(`./Commands/${subcarpetas}/${file}`);
    commands.push(slash.data.toJSON());
  }
});

const rest = new REST({ version: "10" }).setToken(token);

async function createSlash() {
  try {
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands
    });
    console.log("SLASH COMMANDS STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".cyan)
    console.log("┃ ".cyan + `💭  Kinako (きなこ): [情報] ${commands.length}  スラッシュコマンドがロードされました!`.magenta+` ┃`.cyan);
    console.log("┃ ".cyan + `💭  Kinako (きなこ): [INFO] ${commands.length}  Slash Commands loaded!`.bold+"                ┃".cyan);
    console.log(("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan))
  } catch (e) {
    console.error(e);
  }
}

createSlash();
