const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("custom embed")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addChannelOption(option => option.setName("channel").setDescription("channel to which the embed has been sent").setRequired(true).addChannelTypes(0))
        .addStringOption(option => option.setName("title").setDescription("title of the embed").setRequired(true))
        .addStringOption(option => option.setName("description").setDescription("description of the embed"))
        .addAttachmentOption(option => option.setName("thumbnail").setDescription("thumbnail of the embed"))
        .addAttachmentOption(option => option.setName("image").setDescription("image of the embed"))
        .addStringOption(option => option.setName("timestamp").setDescription("timestamp of the embed").addChoices({ name: "yes", value: "yes" }, { name: "no", value: "no" }))
        .addStringOption(option => option.setName("footer").setDescription("footer of the embed"))
        .addStringOption(option => option.setName("color").setDescription("color of the embed"))
        .addStringOption(option => option.setName("author").setDescription("author of the embed")),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        try {    // Crear objetos EmbedBuilder para el embed principal y la respuesta embed2
            let embed = new EmbedBuilder();
            let embed2 = new EmbedBuilder();

            // Obtener los valores de las opciones proporcionadas por el usuario
            let channel = interaction.options.getChannel("channel");
            let title = interaction.options.getString("title");
            let description = interaction.options.getString("description");
            let thumbnail = interaction.options.getAttachment("thumbnail");
            let image = interaction.options.getAttachment("image");
            let timestamp = interaction.options.getString("timestamp");
            let footer = interaction.options.getString("footer");
            let color = interaction.options.getString("color");
            let author = interaction.options.getString("author");

            // Validar que al menos una opción se haya proporcionado
            if (!title && !description && !thumbnail && !image && !timestamp && !footer && !color && !author) {
                return interaction.reply({ embeds: [embed2.setDescription("❌ Please provide at least one option")], ephemeral: true });
            }

            // Configurar las propiedades del embed según las opciones proporcionadas
            if (title) embed.setTitle(title);
            if (description) {
                if (description.length > 3000) {
                    return interaction.reply({ embeds: [embed2.setDescription("❌ The description cannot be more than 3000 characters")], ephemeral: true });
                }
                embed.setDescription(description);
            }
            if (thumbnail) embed.setThumbnail(thumbnail.url);
            if (image) embed.setImage(image.url);
            if (timestamp === "yes") embed.setTimestamp();
            if (author) embed.setAuthor({ name: author });
            if (footer) embed.setFooter({ text: footer });

            // Configurar el color del embed según la opción proporcionada
            switch (color) {
                case "greyple":
                    embed.setColor("Greyple");
                    break;
                case "blurple":
                    embed.setColor("Blurple");
                    break;
                case "fuchsia":
                    embed.setColor("Fuchsia");
                    break;
                case "gold":
                    embed.setColor("Gold");
                    break;
                case "orange":
                    embed.setColor("Orange");
                    break;
                case "red":
                    embed.setColor("Red");
                    break;
                case "white":
                    embed.setColor("White");
                    break;
            }

            // Enviar el embed al canal especificado y enviar la respuesta embed2
            await channel.send({ embeds: [embed] });
            await interaction.reply({ embeds: [embed2.setDescription("🐥 Embed sent correctly")], ephemeral: true });
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