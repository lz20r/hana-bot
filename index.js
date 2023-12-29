const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildsMembers, GuildsMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
require('dotenv').config();

const client = new Client({
	intents: [3276799],
	GatewayIntentBits: [Guilds, GuildsMembers, GuildsMessages],
	partials: [User, Message, GuildMember, ThreadMember]
});
const config = require("./config.json");

console.log((`
╔════════════════════════════════════════════════════════╗
|   Loading Commands and Events |    /-/ By naiara /-/   |
╚════════════════════════════════════════════════════════╝
`));


module.exports = client;
require("colors")
require("./Handlers");
require("./slashCommands");
const Antichash = require("./Handlers/anticrash")(client);
console.log(("ANTICRASH STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".cyan))
if (Antichash) {
	console.log("┃ ".cyan + "💭  Kinako (きなこ): [情報] アンチクラッシュ [アクティブ化された]".magenta + "┃".cyan)
	console.log("┃ ".cyan + "💭  Kinako (きなこ): [INFO] Anticrah [activate]".red + "  ┃".cyan)
} else {
	console.log("┃ ".cyan + "💭  Kinako (きなこ): [情報] アンチクラッシュ[無効]".magenta + "┃".cyan)
	console.log("┃ ".cyan + "💭  Kinako (きなこ): [INFO] AntiCrash [disabled]".green + "  ┃".cyan)
	console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan)
}

const spamDetection = require("./Schemas/spamDetection.js");
const { handleSpamDetection } = require("./Events/Guild/spamDetection.js");
// spam detection
client.on("messageCreate", async (message) => { // detectar cada mensaje 
	if (!message.guild) {
		return; // Ignorar mensajes directos
	}
	const spamDel = await spamDetection.findOne({ // buscar el servidor em la base de datos
		guildId: message.guild.id,
	});
	if (spamDel) {
		handleSpamDetection(message, spamDel.maxDuplicate || 2); // ejecutar la funcion si el servidor esta en la base de datos
	} else {
		return;
	}

});
 
client.login(config.token);
 