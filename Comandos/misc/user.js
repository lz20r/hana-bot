const commands = require("../../Handlers/commands"); // This is the file that contains all the commands
const { EmbedBuilder, } = require("discord.js");



module.exports = {
	name: "user",
	category: "Misc",
	description: "You will obtain the info of a user",
	alias: ["ui", "userinfo", "user-info", "user_info", "", "usuario", "usuarioinfo",
		"usuario-info", "usuario_info", "ユーザー", "ユーザー情報", "ユーザー_情報", "ユーザ"
	],
	/**
	 * 
	 * @param {message} message 
	 * @param {args} args 
	 * @param {client} client 
	 */
	async execute(message, args, client) {
		const server = message.guild.id;
		const { prefix } = message
		try {
			const badgesemojis = {
				"Owner Crown": `<:MT_purpleowner:1162784382021546055>`,
				"Owners Bot": `<:MT_ownersbot:1155251546897010749>`,
				"ActiveDeveloper": `<:MT_active_developer:1155109758387372042>`,
				"HypeSquadOnlineHouse1": `<:MT_house_bravery:1155107137513599036>`,
				"HypeSquadOnlineHouse2": `<:MT_house_brilliance:1155108173619920897> `,
				"HypeSquadOnlineHouse3": `<:MT_house_balance:1155105301612216350>`,
				"Automod": `<:automod:1157994750629130290>`,
				"PartenerIcon": `<:MT_partner_icon:1155123635791593502>`,
				"Stuff": `<:MT_staff:1155109758387372042>`,
			};
			const memberEmojis = {
				"1162788176306376785": `<:N_purpleowner:1162788485577576448>`,
				"1152341413271441488": `<:MT_ownersbot:1155251546897010749>`,
				"1149019678312763413": `<:MT_devsBot:1155520469529788457>`,
				"1150885108568555520": `<:MT_stuff:1155251602446356480>`,
				"1150763435685068830": `<:MT_mods:1155251576663965766>`,
			};
			const statusEmojis = {
				"online": `<:MT_online:1155481494404481144>`,
				"idle": `<:MT_idle:1155481383070867466>`,
				"do not disturb": `<:MT_dnd:1155481254943281253>`,
				"streaming": `<:MT_streaming:1155481326590361683>`,
				"invisible": `<:MT_invisible:1155481434698559538>`,
				"offline": `<:MT_offline:1155495897107550218>`,
			}
			const user = message.mentions.users.first() || message.author
			const member = await message.guild.members.fetch(user.id);
			const user_avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });
			const badges = user.flags.toArray().map(x => badgesemojis[x]).join(' ')
			const botStatus = user.bot ? '✔️' : '❌';
			const status = member.presence?.status || 'offline';
			const roles = message.member.roles.cache.map((role) => role).join(', ');
			const pronouns = member.pronouns?.pronouns || 'Not Specified';

			const embed = new EmbedBuilder()
				.setTitle(
					`${memberEmojis[member.roles.highest.id]} ${member.nickname || member.user.globalName}`
				)
				.setURL(`https://discord.com/users/${member.id}`)
				.setColor('Red')
				.setThumbnail(user_avatar)
				.setTimestamp()
				.setFooter({
					text: `${message.client.user.username}`,
					iconURL: message.client.user.displayAvatarURL({ dynamic: true })
				})
				.addFields
				({
					name: `<:MT_info:1155447584534560778> Member's Information`,
					value: [
						`<:MT_id:1155251563393187931>**ID:** ${user.id}`,
						`**Name:** ${user.username}`,
						`**Nickname:** ${member.nickname}`,
						`**Pronouns:** ${pronouns}`,
						`**Discriminator:** ${user.discriminator}`,
						`**Status:** ${statusEmojis[status]} ${status}`,
						`**Avatar:** [Click Here](${user_avatar}), [Download](${user_avatar})`,
					].join('\n'),
					inline: false,
				},

					{
						name: `<:MT_1831squareannounce:1154866084692889701> Joined Discord`,
						value: `<t:${parseInt(user.createdAt / 1000)}:R>`,
						inline: true,
					},

					{
						name: `<:MT_3384giveslove:1154869247298781305> Joined Server`,
						value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
						inline: true,
					},
					{
						name: `<:MT_Timer:1155471900831649862> Created at`,
						value: `${parseInt(Math.round((Date.now() - user.createdAt) / 86400000))} days ago`,
						inline: true,
					},
					{
						name: `<:MT_1488rocketicon:1154866083363295293> Boosted Server`,
						value: member.premiumSince ? '✔️' : '❌',
						inline: true,
					},

					{
						name: `<:MT_applicationbot:1155251535131967602> Bot`,
						value: botStatus,
						inline: true,
					},

					{
						name: `<:MT_3446blurplecertifiedmoderator:1154870461201661995> Badges`,
						value: badges || "❌",
						inline: true,
					},

					{
						name: `<:MT_2832roles:1154891643921633382> Roles`,
						value: roles,
						inline: false,
					});

			await message.channel.send({ embeds: [embed] });
		} catch (error) {
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
