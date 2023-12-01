const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Information of some user")
        .addUserOption((option) => option.setName(`user`).setDescription(`user to whom you want to change information`)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        try {
            const user = interaction.options.getUser(`user`) || interaction.user;
            const miembro = interaction.guild.members.cache.get(user.id);
            let member = await user.fetch({ force: true });

            const embed = new EmbedBuilder()
                .setColor("C9A0DC")
                .setAuthor({
                    name: `${user.username}`,
                    iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
                })
                .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                .setTitle(`This the information of ${user.username}`)
                .addFields(
                    { name: `General information`, value: `**ID:**${user.id}` },
                    { name: `Account created`, value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true },
                    { name: `Joined the server`, value: `<t:${parseInt(miembro.joinedAt / 1000)}:R>`, inline: true },
                    { name: `User banner`, value: user.bannerURL() ? "** **" : "This user doesn't have a banner" },
                    { name: 'User nickname', value: member.nickname ? member.nickname : "This user doesn't have a nickname" }
                )
                .setFooter({
                    text: `Solicitado por ${interaction.user.tag}`,
                    iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                });
            await interaction.reply({ embeds: [embed] })
        } catch (error) {
            const Error = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error al ejecutar el comando**\n- \`\`\`/${this.data.name}\`\`\`/\n` +
                    `**Error Message:**\n - \`\`\`${e.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
                )
            interaction.deferReply();
            interaction.deleteReply();
            interaction.channel.send({ embeds: [Error] });
        } finally {
            console.log(
                `\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`
            );
        }
    },
};
