const { EmbedBuilder } = require("discord.js");
const { User } = require("../../Schemas/User");
const client = require("../../index");



module.exports = {
    name: 'bag',
    category: 'Currency',
    description: 'See your bag',
    alias: ["bag", 'バッグ'],
    options: [
        {
            name: 'user',
            type: 'User',
            description: 'Mention a user to see their bag',
            required: false
        }
    ],
    async execute(message, args) {
        const server = message.guild.id;
        const prefix = await db.get("prefix." + server)
        try {
            let user = message.options.getUser('user') || message.author
            let food

        } catch (error) {
            const Error = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${error.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${error.stack}\`\`\`\n`
                )
            message.channel.send({ embeds: [Error] }).then((msg) => {
                setTimeout(() => {
                    msg.delete
                })
            })
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    }
}
