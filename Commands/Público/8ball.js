/** @format */

const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("pregunta al 8ball")
        .setDMPermission(true)
        .addStringOption((option) =>
            option
                .setName(`pregunta`)
                .setDescription(`describe tu pregunta`)
                .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        try {

            const pregunta = interaction.options.getString(`pregunta`);

            let respuestas = [
                "En mi opinion, si",
                "Es cierto",
                "Es decididamente asi",
                "Probablemente",
                "Buen pronostico",
                "Todo apunta a que si",
                "Sin duda",
                "Si",
                "Si - definitivamente",
                "Debes confiar en ello",
                "Respuesta vaga, vuelve a intentarlo",
                "Pregunta en otro momento",
                "Sera mejor que no te lo diga ahora",
                "No puedo predecirlo ahora",
                "Concentrate y vuelve a preguntar",
                "Puede ser",
                "No cuentes con ello",
                "Mi respuesta es no",
                "Mis fuentes me dicen que no",
                "Las perspectivas no son buenas",
                "Muy dudoso",
            ];

            let resp = respuestas[Math.floor(Math.random() * respuestas.length)];

            const embed = new EmbedBuilder()
                .setColor("#c1d5db")
                .setAuthor({
                    name: "8BALL",
                    iconURL:
                        "https://static.wikia.nocookie.net/battlefordreamisland/images/f/ff/8-Ball_IDFB_Pose.png/revision/latest?cb=20180408024613",
                })
                .setDescription(
                    `<a:TM_flechazul:1147865776020271195> <@${interaction.user.id}> pregunta: **\`${pregunta}\`**
                     <a:TM_flechaceleste:1147865762694963332> <@${client.user.id}> responde: **${resp}**.`
                )
                .setFooter({
                    text: interaction.user.username,
                    iconURL: interaction.user.avatarURL(),
                })
                .setTimestamp();
            interaction.channel.send({ embeds: [embed] });
        } catch (e) {
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
