const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping test"),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, args) {
        try {
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`close`)
                    .setLabel(`X`)
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`Ping`)
                    .setLabel(`Natsumi's ping`)
                    .setStyle(ButtonStyle.Danger),
            );
            const embed = new EmbedBuilder()
                .setDescription(`**${interaction.user.globalName} click for ping**`) // message
                .setColor("#C9A0DC")
                .setFooter({
                    text: `© ${interaction.client.user.username}`,
                    iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })
                })
            if (!args[0]) {
                return interaction.channel.send({ embeds: [embed], components: [button] })
            }
            const command = commands.get(args[0]) || commands.find(c => c.alias && c.alias.includes(args[0]));
            if (!command) return interaction.channel.send("That command doesn't exist!");
        } catch (e) {
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
