const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botlist")
        .setDescription("Envia una peticion para agregar tu bot a la botlist")
        .addStringOption((option) =>
            option
                .setName(`nombre`)
                .setDescription(`Nombre de tu bot`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName(`descripcion`)
                .setDescription(`Descripcion de tu bot`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName(`caracteristicas`)
                .setDescription(`Listado de caracteristicas o comandos de tu bot`)
                .setRequired(true)
        )
        .addAttachmentOption((option) =>
            option
                .setName(`imagen`)
                .setDescription(`URL de la imagen de tu bot`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName(`version`)
                .setDescription(`Version de tu bot`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName(`dueño`)
                .setDescription(`Username del dueño del bot`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName(`invitacion`)
                .setDescription(`Invitacion de tu bot`)
                .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        try {
            const nombre = interaction.options.getString(`nombre`);
            const descripcion = interaction.options.getString(`descripcion`);
            const caracteristicas = interaction.options.getString(`caracteristicas`);
            const imagen = interaction.options.getAttachment(`imagen`);
            const version = interaction.options.getString(`version`);
            const dueño = interaction.options.getString(`dueño`);
            const invitacion = interaction.options.getString(`invitacion`);

            const channel = interaction.guild.channels.cache.find(
                (c) => c.id === `1058119849240440973`
            );

            const member = interaction.member;

            const embed = new EmbedBuilder()
                .setTitle(`${nombre}`)
                .setDescription(`${descripcion}`)
                .setThumbnail(`${imagen.url}`)
                .addFields(
                    {
                        name: `Caracteristicas principales`,
                        value: `${caracteristicas}`,
                    },
                    {
                        name: `Dueño`,
                        value: `${dueño}`,
                        inline: true,
                    },
                    {
                        name: `Version`,
                        value: `${version}`,
                        inline: true,
                    },
                    {
                        name: `Invitacion`,
                        value: `${invitacion}`,
                        inline: true,
                    }
                )
                .setFooter({
                    text: `El unir este bot a tu servidor queda bajo tu responsabilidad`,
                });

            const embed2 = new EmbedBuilder().setTitle(`${interaction.user.tag}`);

            const mchannel = interaction.guild.channels.cache.find(
                (c) => c.id === `1054226229781344266`
            );

            const message = await channel.send({
                embeds: [embed, embed2],
            });
            interaction.reply({
                content: `Tu bot a sido enviado a revision para entrar en la botlist`,
                ephemeral: true,
            });

            if (message.react(`✅`)) {
                await mchannel.send({ embeds: [embed] });
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

    },
};
