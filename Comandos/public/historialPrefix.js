
// ok mira el servidor

const { error } = require('console')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'historialPrefix',
    category: 'Public',
    description: 'Command for show the prefix history of the server.',
    alias: ['hp', 'prefixhistory', 'prefixes', 'historialprefix', 'historialprefixes', 'hprefix', 'HP'],

    async execute(message, args, client) {
        const { prefix, guildId } = message
        const { db } = client
        try {
            let prefixCanal = "1180580003713404960"
            const [rows] = await db.execute('SELECT * FROM historialPrefix WHERE guildId = ?', [guildId]);
            const canalPrefix = client.channels.cache.get(prefixCanal);
            if (canalPrefix) {
                if (rows.length > 0) {
                    const embed = new EmbedBuilder()
                        .setTitle(`Prefix history of the server **${message.guild.name}**`)
                        .setColor(0x2f3136)
                        .setTimestamp()
                        .setDescription(`**Prefixes:**\n\n${rows.map(row => `\`${row.prefix}\` <@${row.userid}> \`${row.fecha}\``).join('\n')}`)
                        .setFooter({ text: `Requested by ${message.author.globalName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        .setAuthor({ name: message.author.globalName })

                    canalPrefix.send({ embeds: [embed] })
                    message.channel.send({ embeds: [embed] })
                } else {
                    canalPrefix.send(`[${message.author.tag}: ${message.author.globalName}] no have a prefix history yet.`)
                }
            }
        } catch (e) {
            const Error = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name} ${args.join(' ')}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
                )
            message.channel.send({ embeds: [Error] });
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    }
}
