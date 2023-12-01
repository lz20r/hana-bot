const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userbanner")
        .setDescription("Te enseñare tu banner o el de la persona que quieras")
        .addUserOption((option) =>
            option.setName(`user`).setDescription(`Puedes mecionar a algun usuario`)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        try {
            const user = interaction.options.getUser(`user`) || interaction.user;
            if (!user) user = interaction.user;
            let member = await user.fetch({ force: true });
            let banner = user.bannerURL({ size: 512, dynamic: true });

            if (!banner)
                return interaction.reply({
                    content: `${user.username} no tiene un banner para mostrar`,
                    ephemeral: true,
                });

            const embed = new EmbedBuilder()
                .setColor(`C9A0DC`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.tag}`,
                    iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                })
                .setImage(`${banner}`)
                .setTitle(`Banner de ${user.username}`);

            interaction.reply({ embeds: [embed] });
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
