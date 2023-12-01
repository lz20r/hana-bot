const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverbanner")
        .setDescription("Te mostrare el banner del servidor"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        try {
            const { guild } = interaction;
            let banners = guild.bannerURL({ size: 512, dynamic: true });

            if (!banners)
                return interaction.reply({
                    content: `${guild.name} no tiene un banner para mostrar`,
                    ephemeral: true,
                });

            const embed = new EmbedBuilder()
                .setTitle(`Banner del servidor ${guild.name}`)
                .setImage(`${banners}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.tag}`,
                    iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                });
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
