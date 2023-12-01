const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("servericon")
        .setDescription("Te mostrare el icono del servidor"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {

        try {
            const { guild } = interaction;
            let icon = guild.iconURL({ size: 1024, dynamic: true });

            if (!icon)
                return interaction.reply({
                    content: `Este servidor no tiene un icono para mostrar :c`,
                    ephemeral: true,
                });

            const embed = new EmbedBuilder()
                .setTitle(`Este es el icono de ${guild.name}`)
                .setImage(icon)
                .setColor(`#C9A0DC`)
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
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`);
        }


    },
};
