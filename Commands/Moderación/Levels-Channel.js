const clvl = require("../../Schemas/canallvl");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-channellvl")
        .setDescription("Configura el canal del sistema de niveles.")
        .addChannelOption(c => c.setName('canal').setDescription('Establecer el canal para enviar los niveles.').setRequired(true)),

    async execute(interaction, client) {

        try {
            const canal = interaction.options.getChannel("canal");

            if (canal.type !== 0) return interaction.reply({ content: "El canal debe de ser estrictamente de texto.", ephemeral: true });

            if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true });

            if (!interaction.guild.members.me.permissions.has('ManageMessages')) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true });


            let data = await clvl.findOne({ guildId: interaction.guild.id, Channel: canal.id });

            if (!data) {
                let newdata = new clvl({
                    guildId: interaction.guild.id,
                    Channel: canal.id
                });

                await newdata.save();
            } else {
                await clvl.findOneAndUpdate({ guildId: interaction.guild.id }, { Channel: canal.id });
            }

            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("✅ \`|\` Canal establecido")
                    .setDescription(`El canal de sniveles se ha establecido a ${canal}!`)
                    .setColor("Green")
                    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()
                ], ephemeral: true
            });
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
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }
    }
};