const {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} = require("discord.js");

const testing = require("../../Schemas/test");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("database")
        .setDescription("database test"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        try {
            const isDeveloper = checkIfUserIsDeveloper(interaction.user.id);

            if (!isDeveloper) {
                await interaction.reply("This command is only for developers.");
                return;
            }

            const timeoutPromise = new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            const [data] = await Promise.all([
                testing.findOne({ GuidID: interaction.user.id }),
                timeoutPromise,
            ]);

            if (!data) {
                await testing.create({
                    GuidID: interaction.user.id,
                    ChannelID: interaction.channel.id,
                });
            } else {
                console.log(data.UserID);
                console.log("UserID is undefined");
            }

            console.log("Command executed successfully");
            await interaction.reply("Command executed successfully.");
        }
        catch (error) {
            console.error(error);
            message.channel.send("Ocurrió un error al ejecutar este comando");
        } finally {
            console.log( `\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }
    }
}

function checkIfUserIsDeveloper(userId) {
    return userId.startsWith("dev");
}
