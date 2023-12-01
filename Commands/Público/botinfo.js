const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("I will show you the information about me"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client, message) {

        try {
            const days = Math.floor(client.uptime / 86400000)
            const hours = Math.floor(client.uptime / 3600000) % 24;
            const minutes = Math.floor(client.uptime / 60000) % 60;
            const seconds = Math.floor(client.uptime / 1000) % 60;

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel(`${client.user.username}'s Youtube channel`)
                    .setEmoji(`🎥`)
                    .setURL(`https://www.youtube.com/@nazhida`)
            );

            const cpuStat = require('cpu-stat');
            cpuStat.usagePercent(function (error, percent) {
                const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
                const node = process.version
                const cpu = percent.toFixed(2)

                function formatBytes(a, b) {
                    let c = 1024
                    d = b || 2
                    e = ['B', 'KB', 'MB', 'GB', 'TB']
                    f = Math.floor(Math.log(a) / Math.log(c))

                    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
                }

                const embed = new EmbedBuilder()
                    .setColor("#AEC6CF")
                    .setAuthor({
                        name: `${client.user.username}`,
                        iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
                    })
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle(`Heya ${interaction.user.username} i'm ${client.user.username}`)
                    .setDescription(
                        `I am the second official bot of ${client.user.username}'s server, my goal is to be able to serve multiple functions within the server.`
                    )
                    .setImage(
                        `https://i.pinimg.com/originals/d9/2d/f6/d92df69c090bb9f8b402fdabe7840681.jpg`
                    )
                    .addFields(
                        {
                            name: "I was created",
                            value: [
                                `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,].join("\n"),
                        },
                        {
                            name: `I have been created by:`,
                            value: `<@1033160523044376616>`,
                        },
                        {
                            name: "Desarrollador",
                            value: `<@1033160523044376616>`,
                        },
                        {
                            name: "Nombre de usuario",
                            value: `${client.user.username}`,
                        },
                        {
                            name: "ID",
                            value: `${client.user.id}`,
                        },
                        {
                            name: "Comando de ayuda",
                            value: "t-help",
                        },
                        {
                            name: "Tiempo de actividad",
                            value: `\`${days}\` días, \`${hours}\` horas, \`${minutes}\` minutos y \`${seconds}\` segundos.`,
                        },
                        {
                            name: "Bot-Ping",
                            value: `${client.ws.ping}ms`,
                        },
                        {
                            name: "Versión de Node",
                            value: `${node}`,
                        },
                        {
                            name: "Uso de CPU",
                            value: `${cpu}%`,
                        },
                        {
                            name: "Uso de memoria",
                            value: `${memoryUsage}`,
                        }
                    );

                interaction.reply({ embeds: [embed], components: [button] });
            })
        } catch (error) {
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
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`);
        }
    }
};

