const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("Create a button"),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        try {
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`test`)
                    .setLabel(`Menu`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`test2`)
                    .setLabel(`Page 1`)
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`test3`)
                    .setLabel(`Page 2`)
                    .setStyle(ButtonStyle.Secondary)
            );

            // Crear el embed principal
            const embed = new EmbedBuilder()
                .setTitle(`Menu`)
                .setDescription(
                    `Page 1: Utillitys Commands, \nPage 2: Moderation Commands`
                );
            // Crear el embed de comandos de utilidad
            const embed2 = new EmbedBuilder()
                .setTitle(`Utility Commands`)
                .addFields({
                    name: `/user`,
                    value: `I'll show you the user's information`,
                });
            // Crear el embed de comandos de moderación
            const embed3 = new EmbedBuilder()
                .setTitle(`Moderation Commands`)
                .addFields({ name: `/ban`, value: `I will ban some user` });

            // Responder a la interacción con el embed principal y los botones
            await interaction.reply({ embeds: [embed], components: [button] });

            // Crear un colector de componentes de mensaje para el canal de interacción
            const collector = interaction.channel.createMessageComponentCollector();

            // Escuchar los clics de los botones
            collector.on(`collect`, async (i) => {
                // Verificar que solo la persona que ejecutó el comando pueda usar los botones
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({
                        content: `Only the person who executed this command can use the buttons`,
                        ephemeral: true,
                    });
                }

                // Actualizar el mensaje con el embed y los botones correspondientes según el botón presionado
                if (i.customId === `test`)
                    await i.update({ embeds: [embed], components: [button] });
                if (i.customId === `test2`)
                    await i.update({ embeds: [embed2], components: [button] });
                if (i.customId === `test3`)
                    await i.update({ embeds: [embed3], components: [button] });
            });
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
