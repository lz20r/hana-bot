/** @format */

const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("emoji")
        .setDescription("Obtiene información de emoji")
        .addStringOption((option) =>
            option
                .setName(`emoji`)
                .setDescription(`Introduce el emoji`)
                .setRequired(true)
        ),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {
            const emoji = interaction.options.getString(`emoji`);

            if (!emoji.startsWith(`<`))
                return interaction.reply({
                    content: `¡${interaction.user.globalName} Proporcione un emoji personalizado!`,
                    ephemeral: true,
                });

            const emojiid = emoji.split(`:`)[2].slice(0, -1);
            const emojiname = emoji.split(`:`)[1].slice(0, -1);

            const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`
  

            const Emoji = new EmbedBuilder()
                .setTitle(`Emoji Info`)
                .setAuthor({ name: `${client.user.username}'s Warehouse Info-Emoji`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(
                    `**Nombre:** ${emojiname}\n` +
                    `**ID:** ${emojiid}\n` +
                    `**Servidor:** ${interaction.guild.name}\n` +
                    `**URL:** [Descarga tu emoji](${emojiurl})\n`
                )
                .setImage(emojiurl)
                .setColor("#C9A0DC")
                .setFooter({ text: `© Nia` })
            interaction.deferReply();
            interaction.deleteReply();
            interaction.channel.send({ embeds: [Emoji] });
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
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }
    }
};
