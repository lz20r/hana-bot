const commands = require("../../Handlers/commands"); // This is the file that contains all the commands


module.exports = {
    name: "emojis",
    description: "this command for adding emojis",
    category: "Utilities",
    alias: ["emoji", "addemojis", "addemoji", "adde"],
    execute(message, client, args) {
        try {

            switch (args[0]) {
                case "emojis":
                    {

                    }
                    break;

                case "stickers":
                    {

                    }
                    break;

                case "gifs":
                    {

                    }
                    break;

                case "sounds":
                    {

                    }
                    break;
            }
        } catch (e) {
            console.log(e);
            interaction.channel.send("Ocurrió un error al ejecutar este comando");
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    },
};
