//const { Discord, , ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const Hana = require('../../core/client/Client');
const client = Hana;
//ah es que me daba error antes de que no estaba Discord.....
client.on("messageCreate", async (message) => {
	//return console.log("Se ha producido un messageCreate");
    const { prefix } = message 
	if (message.author.bot) {
		return;
	}

	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		const embedmencion = new EmbedBuilder()
			.setColor('c1d5db')
			.setDescription(`Current bot prefix: \`${prefix}\`\nUse **${prefix}help** for a list of commands.`)

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setStyle(5)
					.setLabel('support')
					.setURL('https://discord.gg/momotoro')
			);

		message.reply({ embeds: [embedmencion], components: [row], allowedMentions: { repliedUser: false } });
	}
});
    