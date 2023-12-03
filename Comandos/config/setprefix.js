

const { Guild, EmbedBuilder } = require("discord.js");
const { ChannelType } = require("discord-api-types/v9");

module.exports = {
    name: "setprefix",
    category: 'config',
    description: 'Change the prefix of this bot.',
    alias: ["Prefix", "setP", "sP", "sp", "setp", "changePrefix", "cP", "接頭語", "セットプレフィックス"],
    permissions: ["Administration"],
    async execute(message, args, client) {
        const { prefix } = message
        const { db } = client
        try {
            if (!args[0]) return message.channel.send(`[${message.author.tag}: 
                ${message.author.globalName}] had try to change the prefix **${prefix}** of the server **${message.guild.name}** but didn't excify the new one so will mantain the actual prefix **${prefix}**`); 
            const newPrefix = args[0];
            const { guildId } = message;
            const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' '); 

            //const timestamp = Date.now();
            const [rows] = await db.execute('SELECT * FROM prefijos WHERE guildId = ?', [guildId]);
            if (rows.length > 0) {
                await db.execute('UPDATE prefijos SET prefix = ?, userid = ?, fecha = ? WHERE guildId = ?', [newPrefix, message.author.id, timestamp, guildId]);
                db.execute('Insert into historialPrefix (guildId, prefix, userid, fecha) VALUES (?,?,?,?)', [guildId, newPrefix, message.author.id, timestamp])
            } else {
                db.execute("INSERT INTO prefijos (`prefix`, `guildId`, `userid`, `fecha`) VALUES (?,?,?,?)", [newPrefix, guildId, message.author.id, timestamp])
            }
            message.channel.send({ content: `[${message.author.tag}: ${message.author.globalName}] had change the prefix **${prefix}** of the server **${message.guild.name}** into  **${args[0]}**` })

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


 /*const server = message.guild.id;
        try {
            
            try {
                const setPrefix = db.set("prefix." + server, args[0])
                const getPrefix = await db.get("prefix." + server)
                if (!args[0]) return message.channel.send(`[${message.author.tag}: 
                    ${message.author.globalName}] had try to change the prefix **${getPrefix}** of the server **${message.guild.name}** but didn't excify the new one so will mantain the actual prefix **${getPrefix}**`);
                setPrefix 
                    .then((x) => {
                        if (getPrefix) {
                message.channel.send({ content: `[${message.author.tag}: ${message.author.globalName}] had change the prefix **${getPrefix}** of the server **${message.guild.name}** into  **${args[0]}**` })
                } else {
                    message.reply(`An error occurred while changing the prefix by **[${message.author.tag}: ${message.author.globalName}]**  so will mantain the actual ${prefix}`)
                }
            })
        
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
        } */
