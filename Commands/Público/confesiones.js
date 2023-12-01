const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Schema = require('../../Schemas/confesiones');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("confesiones")
        .setDescription("Sistema de confesiones")

        .addSubcommand(subcommand => subcommand
            .setName("set-confesion")
            .setDescription("Configura el canal para enviar confesiones.")
            .addChannelOption(p => p.setName('channel')
                .setDescription('Selecciona un canal para enviar confesiones').setRequired(true)))

        .addSubcommand(sub => sub
            .setName("confesar")
            .setDescription("Envia una confesion.")
            .addStringOption(c => c.setName('confesion')
                .setDescription('Envia tu confesion.').setRequired(true))
            .addBooleanOption(b => b.setName('privado')
                .setDescription('Elige si tu confesion sea privada o publica.').setRequired(true))),

    async execute(interaction, client) {
        try {
            if (interaction.options.getSubcommand() === "set-confesion") {
                const canal = interaction.options.getChannel("channel");

                if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true });

                if (!interaction.guild.members.me.permissions.has('ManageMessages')) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true });

                try {

                    if (canal.type !== 0) return interaction.reply({ content: "El canal debe ser estrictamente de texto.", ephemeral: true });

                    let data = await Schema.findOne({ guildId: interaction.guild.id, channelId: canal.id });

                    // if(data) return interaction.reply({ content: "Ya hay un canal de confesiones en este servidor.", ephemeral: true })

                    if (!data) {
                        let newdata = await new Schema({
                            guildId: interaction.guild.id,
                            channelId: canal.id
                        });

                        await newdata.save();

                    }
                    await Schema.findOneAndUpdate({
                        guildId: interaction.guild.id,
                        channelId: canal.id
                    });

                    interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`El canal fue establecido en: ${canal}.`)
                            .setColor("#2b2d31")]
                    });
                } catch (e) {
                    console.log(e);
                }
            }

            if (interaction.options.getSubcommand() === "confesar") {
                const con = interaction.options.getString("confesion");
                const prv = interaction.options.getBoolean("privado");

                let data = await Schema.findOne({ guildId: interaction.guild.id, });

                if (!data) return interaction.reply({ content: "¡No hay un canal de confesiones especificado en el servidor!", ephemeral: true });

                if (prv === false) {

                    let prvf = new EmbedBuilder()
                        .setAuthor({ name: "Confesión", iconURL: interaction.user.avatarURL() })
                        .setDescription(`> *${con}*`)
                        .setColor("#2b2d31")
                        .setFooter({ content: "Confesion de", text: interaction.user.username, iconURL: interaction.user.avatarURL() });

                    interaction.reply({ content: "La confesion se ha mandado con exito.", ephemeral: true });

                    await client.channels.cache.get(data.channelId).send({ embeds: [prvf] });

                } else if (prv === true) {
                    let prvt = new EmbedBuilder()
                        .setAuthor({ name: "🤫 Confesión Anonima" })
                        .setDescription(`> *${con}*`)
                        .setColor("#2b2d31")
                        .setTimestamp();


                    interaction.reply({ content: "La confesion se ha mandado con exito.", ephemeral: true });
                    await client.channels.cache.get(data.channelId).send({ embeds: [prvt] });
                }
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