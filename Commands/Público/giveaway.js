const { SlashCommandBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giveaways")
        .setDescription("Crea un sorteo")
        .addChannelOption(o => o.setName("canal").setDescription("El canal donde se llevara a cabo del sorteo").setRequired(true))
        .addStringOption(o => o.setName("duracion").setDescription("Duracion del sorteo").setRequired(true))
        .addStringOption(o => o.setName("premio").setDescription("Premio a sortear").setRequired(true))
        .addIntegerOption(o => o.setName("ganadores").setDescription("Cantidad de Ganadores").setRequired(true))
        .addRoleOption(o => o.setName("rol-requerido").setDescription("El rol requerido para el sorteo").setRequired(false)),


    async execute(interaction, client) {

        try {

            if (!interaction.guild.members.me.permissions.has('ManageMessages')) return interaction.reply({ content: 'No tengo permisos para ejecutar este comando necesitas `\MANAGE_MESSAGES\`.', ephemeral: true });

            const prize = interaction.options.getString("premio");
            const winners = interaction.options.getInteger("ganadores");
            const duration = ms(interaction.options.getString("duracion"));
            const role = interaction.options.getRole("rol-requerido");

            if (!ms(duration)) return interaction.reply({ content: "La duracion no es valida", ephemeral: true });

            if (role === null) {
                client.giveaways.start(interaction.options.getChannel("canal"), {
                    duration: duration,
                    winnerCount: winners,
                    hostedBy: interaction.user,
                    prize: prize,
                    messages: {
                        giveaways: "**Nuevo sorteo**",
                        giveawaysEnded: "*Sorteo Finalizado*",
                        inviteToParticipate: "Reacciona a 🎉 para participar",
                        winMessage: `Enhorabuena {winners}, ${winners > 1 ? "Han ganado" : "Ganaste"} **{this.prize}**`,
                        drawing: `El sorteo termina en {timestamp}`,
                        embesFooter: `Hay {this.winnerCount} ${winners > 1 ? "ganadores" : "ganador"}`,
                        noWinner: "Sorteo cancelado, no hubo suficientes participantes",
                        winners: winners > 1 ? "ganadores" : "ganador",
                        endedAt: "Termina",
                        hostedBy: "Hosteado por {this.hostedBy}",
                    },

                    exemptMembers: (m => role ? !m.roles.cache.has(role.id) : false),

                });

                return interaction.reply({ content: `Sorteo creado en ${interaction.options.getChannel("canal").toString()} exaitosamente`, ephemeral: true });
            } else {
                client.giveaways.start(interaction.options.getChannel("canal"), {
                    duration: duration,
                    winnerCount: winners,
                    hostedBy: interaction.user,
                    prize: prize,
                    messages: {
                        giveaways: "**Nuevo sorteo**",
                        giveawaysEnded: "*Sorteo Finalizado*",
                        inviteToParticipate: "Reacciona a 🎉 para participar",
                        winMessage: `Enhorabuena {winners}, ${winners > 1 ? "Han ganado" : "Ganaste"} **{this.prize}**`,
                        drawing: `*Necesitas el rol ${role} para paraticipar.*\nEl sorteo termina {timestamp}`,
                        embesFooter: `Hay {this.winnerCount} ${winners > 1 ? "ganadores" : "ganador"}`,
                        noWinner: "Sorteo cancelado, no hubo suficientes participantes",
                        winners: winners > 1 ? "ganadores" : "ganador",
                        endedAt: "Termina",
                        hostedBy: "Hosteado por {this.hostedBy}",
                    },

                    exemptMembers: (m => role ? !m.roles.cache.has(role.id) : false),

                });

                return interaction.reply({ content: `Sorteo creado en ${interaction.options.getChannel("canal").toString()} exitosamente`, ephemeral: true });
            }
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