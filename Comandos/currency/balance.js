const { User } = require("../../Schemas/User");
const client = require("../../index");




module.exports = {
    name: 'balance',
    category: 'Currency',
    description: 'this command is for bal\n',
    alias: ["b", "bal", "balance", "Kinabal", "Kinabalance", "バランス", "きなこバランス"],

    async execute(message, args) {
        const { prefix } = message
        const { db } = client
        try {

            const targetUserId = args[0] || message.author.id;

            if (!await User?.findOne({ guildId: message.guild.id, userId: targetUserId })) return message.channel.send(`<@${targetUserId}> do not have an account yet!`)
            const user = await User?.findOne({ guildId: message.guild.id, userId: targetUserId });


            message.channel.send(
                targetUserId === message.author.globalName
                    ? `You balance is **${user.balance}** coins`
                    : `<@${targetUserId}> have **${user.balance}** coins`
            );

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
    }
} 
