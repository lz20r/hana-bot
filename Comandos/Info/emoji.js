const { EmbedBuilder } = require("discord.js");
const { User } = require("../../Schemas/User");
const client = require("../../index");
;

let prefix;
module.exports = {
    name: 'emoji',
    category: 'Information',
    description: 'Obtain emoji information',
    usage: `${prefix} emoji-info <emoji>`,
    alias: ['info-emoji', 'emoji-info', 'emoji', 'ei', 'ie'],
    options: [
        {
            name: 'emoji',
            description: 'The emoji',
            type: 'STRING',
            required: true
        }
    ],
    async execute(message, args) {
        const server = message.guild.id;
        const prefix = await db.get("prefix." + server)
        try {
            // obtener el emoji
            const emoji = args[0];
            if (!emoji)
                return message.channel.send({
                    content: `¡Proporcione un emoji`
                });
            message.delete();
            if (!emoji.startsWith(`<`))
                return message.channel.send({
                    content: `¡Proporcione un emoji personalizado!`
                });
            console.log(emoji)
            const emojiname = emoji.split(`:`)[1]
            // obtener la identificación emoji
            const emojiid = emoji.split(`:`)[2].slice(0, -1);
            // obtener la URL del emoji
            const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`;
            // enviar una respuesta

            const Emoji = new EmbedBuilder()
                .setTitle(`Emoji Info`)
                .setAuthor({ name: `${client.user.username}'s Warehouse Info-Emoji`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(
                    `**Nombre:** ${emojiname}\n` +
                    `**ID:** ${emojiid}\n` +
                    `**Servidor:** ${message.guild.name}\n` +
                    `**URL:** [Descarga tu emoji](${emojiurl})\n`
                )
                .setImage(emojiurl)
                .setColor("#C9A0DC")
                .setFooter({ text: `© Nia` })
            message.channel.send({ embeds: [Emoji] });
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
