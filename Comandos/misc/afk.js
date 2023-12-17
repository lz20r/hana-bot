const { EmbedBuilder } = require('discord.js');
const commands = require("../../Handlers/commands"); // This is the file that contains all the commands
const afk = require("../../Schemas/afk");
const client = require("../../index");



module.exports = {
	name: 'afk',
	category: 'Misc',
	description: 'Set your afk message',
	alias: ["AFK", "Afk", "aFk", "afK", "AFk", "aFK", "AfK", "afk"],
	async execute(message, args) {
		const server = message.guild.id;
		const { prefix } = message
		try {
			let data = await afk.findOne({ guildId: message.guild.id, userId: message.author.id })
			let reason = args.join(" ") || "No provided"
			if (!data) {
				let n = new afk({
					guildId: message.guild.id,
					userId: message.author.id,
					TimeAgo: Date.now(),
					Reason: reason
				})
				await n.save()
			}
			const embed = new EmbedBuilder()
				.setTitle("<:mtbruh:1158367269668257874> AFK Established")
				.setDescription(`<:mtdormido:1158368170516680794> ${message.author.tag} Now you're afk.\n\n <a:MT_noted:1158115594651041863> Reason: ${reason}`)
				.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
				.setColor("#cca9dd")
				.setTimestamp()
				.setFooter({
					text: "I will notify those who mention you.",
					iconURL: client.user.displayAvatarURL({ dynamic: true })
				})

			await message.channel.send({ embeds: [embed] }).then(v => {
				setTimeout(() => {
					v.delete()
				}, 10000)
			})
			await message.channel.send({
				content: "<:mtpensando:1158367326354276352> Now you're afk! If you want to remove it, send a message on this channel",
				ephemeral: true,
			}).then(v => {
				setTimeout(() => {
					v.delete()
				}, 10000);
			})
		} catch (e) {
			const Error = new EmbedBuilder()
				.setColor(0xFF0000)
				.setDescription(
					`**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name}\`\`\`\n\n` +
					`**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
					`**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
				)
			message.channel.send({ embeds: [Error] }).then((msg) => {
				setTimeout(() => {
					msg.delete
				})
			})
		} finally {
			console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
		}
	}
} 
