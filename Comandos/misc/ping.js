const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const commands = require("../../Handlers/commands");
const client = require("../../index");



module.exports = {
    name: "ping",
    category: "Miscleaneous",
    description: "ping test",
    alias: ["p", "ping", "pingtest", "ピング"],

    async execute(message, args) {
        const { prefix } = message
        const { db } = client
        try {

            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`ping`)
                    .setLabel(`Ping 🏓`)
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`Close`)
                    .setLabel(`X`)
                    .setStyle(ButtonStyle.Danger),
            );
            const Ping = new EmbedBuilder()
                .setDescription(`**${message.author.globalName} click for ping**`)
                .setColor("#C9A0DC")
                .setFooter({
                    text: `© ${message.author.username}`,
                    iconURL: message.client.user.displayAvatarURL({ dynamic: true })
                })
            if (!args[0]) {
                return message.channel.send({ embeds: [Ping], components: [buttons], ephemeral: true })
            }
            const command = commands.get(args[0]) || commands.find(c => c.alias && c.alias.includes(args[0]));
            if (!command) return message.channel.send("That command doesn't exist!");
        } catch (e) {
            const Error = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
                )
            message.channel.send({ embeds: [Error] }).then((msg) => {
                setTimeout(() => {
                    msg.delete
                })
            })
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    },
};
