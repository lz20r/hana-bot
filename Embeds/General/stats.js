const { EmbedBuilder, embedLength } = require("discord.js");
const client = require("../../index");
const os = require('os');

function loading(cantidad, total) {
    const percent = Math.floor(cantidad / total * 10)
    const dots = "▰".repeat(percent)
    const left = 10 - percent
    const empty = "▱".repeat(left)
    return dots + empty
}


module.exports = (client, message) => {
    const memberCount = message.guild.memberCount;
    const botCount = message.guild.members.cache.filter((member) => member.user.bot).size;
    const si = require('systeminformation');
    const os = require("os");
    const RAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
    const CPU = os.cpus()[0].times;

    return {
        stats: new EmbedBuilder()
            .setTitle(`${client.user.username} | Stats`)
            .setDescription(
                `> Kon'nichiwa, entāteimentobottodesu. Watashi wa anata no tsuitachi o akaruku suru tame ni itsumo koko ni imasu.\n> \n> Watashi wa nia no sōzō no minamotodesu Watashi no shimei wa, sābā no akutibiti o fuyashi, sābā o tanoshisa to yorokobi de mitasu kotodesu.\n\n`
            )

            .setColor("#C9A0DC")
            .addFields(
                {
                    name: '\u200A', value: '\u200A', inline: false,
                },

                {
                    name: `**❱ システム構成**`,
                    value:
                        `**ボットの名前**: <@1033160523044376616> (Nia)\n` +
                        `**ボットの作成者**: <t:${Math.floor(client.user.createdAt.getTime() / 1000)}:R>\n` +
                        `**アクティブ時間**: <t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                    inline: false
                },

                {
                    name: `**❱ ボットの情報.**\n`,
                    value:
                        ` \`\`\`RAM:${loading(RAM, 100)} [${Math.floor(RAM, 100 * 100)}%]\n` +
                        `CPU:${loading(CPU, 100)} [${Math.floor(CPU, 100 * 100)}%] \`\`\` `,
                    inline: false
                },

                {
                    name: '**❱ システムパフォーマンス**',
                    value:
                        ` \`\`\`CPU: ${os.cpus()[0].model} ${os.cpus()[0].speed} GHz\n` +
                        `RAM: ${(RAM)} MB\n` +
                        `OS: ${os.type()} ${os.release()} ${os.arch()}\`\`\``,
                    inline: false
                },

                {
                    name: '**❱ このサーバー**',
                    value:
                        `\`\`\`👥 Members: ${memberCount}\n` +
                        `🤖 Bots: ${botCount}\n` +
                        `📇 Roles: ${message.guild.roles.cache.size}\n` +
                        `😄 Emojis: ${message.guild.emojis.cache.size}\n` +
                        `📝 Text Channels: ${message.guild.channels.cache.filter((channel) => channel.type === 'GUILD_TEXT').size}\n` +
                        `🔊 Voice Channels: ${message.guild.channels.cache.filter((channel) => channel.type === 'GUILD_VOICE').size}\n\`\`\``,
                    inline: true
                },

                {
                    name: '**❱ 一般的な情報**',
                    value:
                        `\`\`\`🎧 Players: ${memberCount}\n` +
                        `⚙️ Comands: ${client.users.cache.size}\n` +
                        `😄 Emojis: ${message.guild.emojis.cache.size}\n` +
                        `✨ Servers: ${client.guilds.cache.size}\n\`\`\``,
                    inline: true
                }
            )
            .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    }
} 

