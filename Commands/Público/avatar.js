const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Te enseñare el avatar del usuario que quieras")
        .addUserOption((option) =>
            option.setName(`user`).setDescription(`Puedes mecionar a algun usuario`)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client, message) {

        try {
            const user = interaction.options.getUser(`user`) || interaction.user;

            const embed = new EmbedBuilder()
                .setTitle(`Avatar de ${user.tag}`)
                .setDescription(
                    `[PNG](${user.avatarURL({ format: `png` })}) / [WEBP](${user.avatarURL({
                        dynamic: true,
                    })}) / [JPG](${user.avatarURL({ format: `jpg` })})`
                )
                .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
                .setFooter({
                    text: `Pedido por: ${interaction.user.username}`,
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
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }

    },
};
