

const { EmbedBuilder } = require("discord.js")
const anticrash = require("../../Handlers/anticrash")
module.exports = {
    name: 'stats',
    category: 'Information',
    description: 'command for seen the stats',
    alias: ['stats', 'estads', 'estadísticas', 'std', 'st', 'estd', 'ST', 'STD', 'ESTD', 'STATS'],

    async execute(message, args) {
        const client = require("../../index");
        const { stats } = require("../../Embeds/General/stats")(client, message);
        const { prefix } = message
        const { db } = client
        try {
            message.channel.send({ embeds: [stats] });
        } catch (error) {
            const Error = new EmbedBuilder()
                .setDescription(
                    `**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${error.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${error.stack}\`\`\`\n`
                )
                .setColor(0xFF0000)
            message.channel.send({ embeds: [Error] });
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    }
}
