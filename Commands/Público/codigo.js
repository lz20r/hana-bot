const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("codigo")
        .setDescription("Envia un codigo al canal sin que se borre!!"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        try {
            const modal = new ModalBuilder()
                .setCustomId(`codigo`)
                .setTitle(`Envia un codigo al canal`);

            const textinput = new TextInputBuilder()
                .setCustomId(`codigoembed`)
                .setLabel(`Pega tu codigo aqui!!`)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
                .setMaxLength(4000);

            modal.addComponents(new ActionRowBuilder().addComponents(textinput));

            await interaction.showModal(modal);
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
    }
};

