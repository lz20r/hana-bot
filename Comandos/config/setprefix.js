const { Guild, EmbedBuilder } = require("discord.js");
const { ChannelType } = require("discord-api-types/v9");
const client = require("../../index");




module.exports = {
    name: "setprefix",
    category: 'config',
    description: 'Change the prefix of this bot.',
    alias: ["Prefix", "setP", "sP", "sp", "setp", "changePrefix", "cP", "接頭語", "セットプレフィックス"],
    permissions: ["Administration"],
    async execute(message, args, prefix) {
        const server = message.guild.id;
        try {
            try {
                const setPrefix = db.set("prefix." + server, args[0])
                const getPrefix = await db.get("prefix." + server)
                if (!args[0]) return message.channel.send(`[${message.author.tag}: 
                    ${message.author.globalName}] had try to change the prefix **${getPrefix}** of the server **${message.guild.name}** but didn't excify the new one so will mantain the actual prefix **${getPrefix}**`);
                setPrefix /*
                    .then((x) => {
                        if (getPrefix) {*/
                message.channel.send({ content: `[${message.author.tag}: ${message.author.globalName}] had change the prefix **${getPrefix}** of the server **${message.guild.name}** into  **${args[0]}**` })
                /*} else {
                    message.reply(`An error occurred while changing the prefix by **[${message.author.tag}: ${message.author.globalName}]**  so will mantain the actual ${prefix}`)
                }
            })
        */
            } catch (e) {
                console.log(e)
            }
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
