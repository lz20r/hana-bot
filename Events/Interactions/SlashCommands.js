const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildEmoji } = require("discord.js"); 
const client = require("../../index");
const path = require("path")
const fs = require("fs");
const commands = require("../../Handlers/commands");

client.on("interactionCreate", async (interaction) => {
	if (interaction.isButton() && interaction.customId == "close") return interaction.message.delete();

	if (interaction.customId == "Ping") {
		const pingEmbed = new EmbedBuilder().setDescription(`Pong! Mi ping es de ${client.ws.ping} ms.`);
		return interaction.update({
			embeds: [pingEmbed]
		});
	}

	if (interaction.values) return helpGod(interaction);

	if (interaction.channel.type === 'dm') return;

	if (interaction.isChatInputCommand()) {
		try {
			const command = client.slashcommands.get(interaction.commandName);
			if (!command) return;

			await command.execute(interaction, client);

			// Registro del comando en el canal con el ID 938474
			const logChannelId = "1176225809976000563";
			const logChannel = interaction.guild.channels.cache.get(logChannelId);

			if (logChannel) {
				const logEmbed = new EmbedBuilder()
					.setColor("#c1d5db")
					.setTitle("SlashCommand Executed")

					.addFields(

						{
							name: 'Usuario',
							value: `${interaction.user.displayName} [${interaction.user.tag}]`,
							inline: true
						},
	
						{
							name: 'Run CMD',
							value: interaction.commandName,
							inline: false
						},
	
						{
							name: 'Canal',
							value: interaction.channel.name,
							inline: false
						},
	
						{
							name: 'Servidor',
							value: interaction.guild.name,
							inline: false
						}
	
					)      
					.setTimestamp();

				logChannel.send({ embeds: [logEmbed] });
			} else {
				console.error(`Log channel with ID ${logChannelId} not found.`);
			}
		} catch (error) {
			console.error(`Error executing slash command ${interaction.commandName}:`, error);
		}
	}
});


async function helpGod(interaction) {
	const prefix = await db.get("prefix." + interaction.guild.id)
	const tipo = interaction.values[0]
	const todosComandos = client.commands.map(x => x) || "None"
	const comandos = todosComandos.filter(x => x.category.toLowerCase() == tipo.toLowerCase())
	if (!comandos.length === 0) return interaction.reply("There are no commands in this category.")

	interaction.update({
		embeds: [
			new EmbedBuilder()
				.setTitle(`${tipo}`)
				.setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
				.setDescription(`📖 **commands** \n` + `\`\`\`\n ${distribuirElementos(comandos.map(x => x.name))}\n\`\`\`` || "There are no commands in this category.")
				.setColor("#C9A0DC")
				.setFooter({ text: `© Nia` }),
		],
		/*
		embedss: [
			new EmbedBuilder()
			.setTitle(`${tipo}`)
			.setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
			.setColor("#C9A0DC")
			.setDescription(`📖 **commands** \n` + `\`\`\`\n ${distribuirElementos(comandos.map(x => x.description))}\n\`\`\`` || "There are no commands in this category.") 
			.setFooter({ text: `© Nia` }),
		]
		*/
	})
};

function distribuirElementos(x) {
	let array = x
	if (!Array.isArray(array)) array = x.split(" ")
	if (x.lenght > 30) return console.log("La descripción debe ser menor a 30 caracteres.")
	const filas = Math.ceil(array.length / 4);
	const distribuir = [];

	for (let i = 0; i < filas; i++) {
		distribuir.push(array.slice(i * 3, (i + 1) * 3));
	}
	const espacioArray = distribuir.map(fila => {
		return fila.map(item => item + " ".repeat(23 - item.toString().length)).join("");
	});
	return espacioArray.join("\n");

}
