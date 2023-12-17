const {
    EmbedBuilder,
    ButtonBuilder, ButtonStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");
const fs = require('fs');
const path = require('path');
let server;
let prefix;

const commands = require("../../Handlers/commands"); // This is the file that contains all the commands



module.exports = {
    name: "currency",
    description: "this command if for eco",
    category: "Eco",
    alias: ["Eco", "currency", "eco", "経済"],
    async execute(message) {
        server = message.guild.id;
        prefix = await Db.get("prefix." + server)

        client = message.client;

        try {

            if (commands === `${prefix}${this.alias}`) {

                let user = message.mentions.users.first() || message.author; // Aqui obtenemos la mención del usuario y si no es mencionado usará al autor del mensaje

                let dinero = db[user.id].eco; // Esto obtendra el dinero del usuario

                var EcoEmbed = new discord.MessageEmbed()
                    .setDescription(`Balance of ${message.author}`)
                    .addField("Money", `$${dinero}`)
                    .setColor("RANDOM")

                return message.channel.send(EcoEmbed);

            }

            fs.writeFile("../../db.json", JSON.stringify(db), (err) => { // Aqui se escriben los datos en nuestra db
                if (err) console.log(err) // Si hay un error nos lo mandará a la consola
            });

        } catch (e) {
            const Error = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name}\`\`\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
                )
            message.channel.send({ embeds: [Error] }).then((msg) => {
                setTimeout(() => {
                    msg.delete
                })
            })
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    }
}
