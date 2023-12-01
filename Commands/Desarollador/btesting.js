const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonStyle,
    ButtonBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("btesting")
        .setDescription("button test"),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        try {
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`I'm a button`)
                    .setLabel(`button`)
                    .setStyle(ButtonStyle.Primary)
            );

            await interaction.reply({ components: [button] });
        } catch (error) {
            console.error(error);
            message.channel.send("Ocurrió un error al ejecutar este comando");
        } finally {
            console.log( `\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }
    }
}
