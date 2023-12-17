const { SlashCommandBuilder } = require("discord.js");
const Jimp = require("jimp");
const path = require("path");

// Objeto JSON
const config = {
    "user_disabled_telemetry": true,
    "vscode_telemetry_enabled": true,
    "app_name": "Visual Studio Code"
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("greetings")
        .setDescription("Greetings test"),

    async execute(interaction) {
        await interaction.deferReply();
        try {
            const applyText = async (image, text) => {
                const font = await Jimp.loadFont(path.join(process.cwd(), "fonts", "Spicy_Wasabi.fnt"));
                const textWidth = Jimp.measureTextHeight(font, text);
                const y = (720 / 2) - (30 / 2) + 50;
                const x = (1280 - textWidth) / 2 - 425;

                return image.print(font, x, y, text, 1);
            };

            const image = await Jimp.read(path.join(process.cwd(), "images", "background_1.png"));
            console.log("No hay error")
            const avatar = await Jimp.read(interaction.user.displayAvatarURL({ extension: 'png', size: 2048 }));

            image.contain(1280, 720)
            avatar.resize(300, 300).circle();
            image.composite(avatar, (1280 - 300) / 2 - 300, (720 - 300) / 2 - 125);
            await applyText(image, `<Welcome, ${interaction.user.username}!>`);

            const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

            await interaction.editReply({ files: [{ attachment: buffer, name: "greetings.png" }], content: "Welcome, " + interaction.user.username + "!" });
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




