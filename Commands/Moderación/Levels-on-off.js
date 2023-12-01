const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const niveles = require("../../Schemas/configlvl");
const config2 = require("../../Schemas/configlvl");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-levels")
        .setDescription("Activa o desactiva el sistema de niveles en el servidor.")
        .addStringOption(a => a.setName("accion").setDescription("Activa o desactiva el sistema de niveles en el servidor.").addChoices({ name: "activar", value: "activar" }).addChoices({ name: "desactivar", value: "des" }).setRequired(true)),

    async execute(interaction, client) {

        try {
            const accn = interaction.options.getString("accion");

            if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true });

            if (!interaction.guild.members.me.permissions.has('Administrator')) return interaction.reply({ content: '¡No tengo permisos para esto!', ephemeral: true });

            const data2 = await config2.findOne({ GuildId: interaction.guild.id });
            if (!data2) {
                let newdata = new config2({
                    GuildId: interaction.guild.id,
                    activado: false
                });
                await newdata.save();
            } else {

                if (accn === "activar") {
                    if (data2.activado === true) return interaction.reply({ content: "El sistema de niveles ya está activado en este servidor.", ephemeral: true });


                    await config2.findOneAndUpdate({ GuildId: interaction.guild.id }, { activado: true });

                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`El sistema de niveles ha sido activado!`)
                            .setColor("Green")], ephemeral: true
                    });

                }
            }

            if (accn === "des") {
                if (data2.activado === false) return interaction.reply({ content: "El sistema de niveles ya se encuentra desactivado en este servidor.", ephemeral: true });

                await config2.findOneAndUpdate({ GuildId: interaction.guild.id }, { activado: false });


                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`El sistema de niveles ha sido desactivado!`)
                        .setColor("Green")], ephemeral: true
                });
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
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }
    }
};