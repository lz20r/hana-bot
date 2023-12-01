/** @format */



const Discord = require("discord.js");
module.exports = {
	name: "8ball",
	category: "Fun",
	description: "Ask to the 8ball",
	alias: ["8ball", "8b", "8bola", "bola8", "8ボール", "8ボ"],

	async execute(message, args) {
		const server = message.guild.id;
		const prefix = await db.get("prefix." + server)
		try {
			var resp = [
				"In my opinion, yes",
				"Is true",
				"It is decided like this",
				"Probably",
				"Good prognosis",
				"Everything points to yes",
				"Definitely",
				"Yeah",
				"Yes, definitely",
				"You must trust it",
				"Vague answer, try again",
				"Ask another time",
				"I better not tell you now",
				"I can't predict it now",
				"Concentrate and ask again",
				"Could be",
				"Do not count on it",
				"My answer is no",
				"My sources tell me no",
				"The outlook is not good",
				"Very doubtful",
			];

			let user = message.author;

			let pregunta = args.join(" ");

			const embed = new Discord.EmbedBuilder()
				.setAuthor({
					name: "8BALL",
					iconURL:
						"https://static.wikia.nocookie.net/battlefordreamisland/images/f/ff/8-Ball_IDFB_Pose.png/revision/latest?cb=20180408024613",
				})
				.setDescription(
					`> - To the question \`${pregunta}\`, from <@${message.author.id
					}>\n > - ${message.client.user.username}'s answering: **${resp[Math.floor(Math.random() * resp.length)]
					}**.`
				)
				.setColor("#c1d5db")
				.setFooter({
					text: `${message.author.username}`,
					iconURL: user.avatarURL(),
				})
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
			message.delete();
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
			console.log(`💭  [CMD] ${message.author.globalName} [${message.author.tag}] used command ${prefix}${this.name}`);
		}
	},
};
