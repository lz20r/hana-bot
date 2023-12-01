const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js')
const OpenAI = require('openai')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionBotReply')

const config = require('../../config.json')

const openai = new OpenAI({
    apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat-gpt')
        .setDescription('Puedes preguntar algo a chat GPT')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('Escribe la pregunta que deses que te responda la IA')
                .setMaxLength(300)
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        try {
            const { options } = interaction
            const pregunta = options.getString('pregunta')
            console.log(pregunta)
            try {
                const res = await openai.chat.completions.create({
                    model: 'text-davinci-003',
                    messages: [{ role: 'user', content: pregunta }],
                })

                const embed = new EmbedBuilder()
                    .setTitle('PREGUNTA A CHAT GPT')
                    .setAuthor({ name: `${interaction.user.tag} Acaba de hacer una pregunta a CHAT-GPT`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setColor('Random')
                    .setDescription(`Pregunta: \`\`\`${pregunta}\`\`\`\n\n Respuesta: \`\`\`${res.data.choices[0].text}\`\`\` `)

                return await interaction.reply({ embeds: [embed] })
            } catch (error) {
                console.log(error);
                return errReply(interaction, "Se produjo un error al tratar de realizar este comando", true)
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
