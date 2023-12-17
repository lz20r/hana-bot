const {
    EmbedBuilder,
    ButtonBuilder, ButtonStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");
let server;

const commands = require("../../Handlers/commands"); // This is the file that contains all the commands


module.exports = {
    name: "help",
    description: "this command if for help",
    category: "Info",
    alias: ["h", "help", "ayuda", "へるぷ"],
    async execute(message, args) {
        server = message.guild.id;
        const { prefix } = message

        client = message.client;

        const fs = require('fs');
        const path = require('path');

        function contarCarpetas(directorio) {
            let contador = 0;
            // Lee el directorio
            let archivos = fs.readdirSync(directorio);
            // Recorre cada archivo/carpeta en el directorio
            archivos.forEach(archivo => {
                // Construye la ruta completa del archivo/carpeta
                let rutaCompleta = path.join(directorio, archivo);
                // Comprueba si es una carpeta
                if (fs.statSync(rutaCompleta).isDirectory()) {
                    contador++;
                    // Llama a la función de manera recursiva para las subcarpetas
                    contador += contarCarpetas(rutaCompleta);
                }
            });
            return contador;
        }

        function contarArchivosJS(directorio) {
            let contador = 0;
            const files = fs.readdirSync(directorio);

            files.forEach(archivo => {
                const rutaCompleta = path.join(directorio, archivo);
                const stat = fs.statSync(rutaCompleta);

                if (stat.isDirectory()) {
                    contador += contarArchivosJS(rutaCompleta); // Llamada recursiva para entrar al subdirectorio.
                } else if (path.extname(archivo) === '.js') {
                    contador += 1; // Archivo con extensión .js encontrado.
                }
            });

            return contador;
        }
        try {
            const help_emojis = {
                "action": "<:momoaction:1155891130131550288>",
                "anime": `<:momoanime:1155876803248934982>`,
                "club": `<:momoclub:1155881685552996473>`,
                "config": `<:momoconfig:1155884998138802367>`,
                "currency": `<:momocurrency:1155885001053831341>`,
                "fun": `<:momofun:1155896925225234552>`,
                "info": `<:momoinfo:1155896927917965463>`,
                "manager": `<:momomanager:1156651625583218708>`,
                "marriage": `<:momomarry:1156652332281503845>`,
                "misc": `<:momomisc:1156665868516860035>`,
                "mod": `<:momomod:1156657341450694816>`,
                "music": `<:momomusic:1156657343291990057>`,
                "nsfw": `<:momonsfw:1156657348463575070>`,
                "reaction": `<:momoreaction:1156666793591586939>`,
                "utils": `<:momoutility:1156657351508623360>`,
                "genshin": `<:momogenshin:1168655976535171105>`
            }
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`close`)
                    .setLabel(`X`)
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setURL(`https://www.youtube.com/@momototoro/about`)
                    .setLabel(`${client.user.username}'s YouTube Channel`)
                    .setEmoji(`🎥`)
                    .setStyle(ButtonStyle.Link),
            )
            const embed = new EmbedBuilder()
                .setTitle(`${client.user.username}'s Commands`)
                .setDescription(
                    `**» Menu Help**\n\n` +
                    `We have \`${contarCarpetas('./Comandos')}\` categories, \`${contarArchivosJS('./Commands')}\` \`/\` and \`${contarArchivosJS('./Comandos')}\` \`${prefix}\` commands to explore.\n` +
                    `There are \`${0}\` secret commands.\n\n` +
                    `Command list: \`${prefix} help <category>\`\n` +
                    `Command in detail: \`${prefix} help <command>\`\n\n` +
                    `**» Categories:\n**` +
                    `\`${prefix} help action\`  ∷ ${help_emojis["action"]} Action\n` +
                    `\`${prefix} help anime\`   ∷ ${help_emojis["anime"]} Anime\n` +
                    `\`${prefix} help club\`    ∷ ${help_emojis["club"]} Club\n` +
                    `\`${prefix} help config\`  ∷ ${help_emojis["config"]} Setting\n` +
                    `\`${prefix} help currency\`∷ ${help_emojis["currency"]} Economy\n` +
                    `\`${prefix} help fun\`     ∷ ${help_emojis["fun"]} Fun\n` +
                    `\`${prefix} help info\`    ∷ ${help_emojis["info"]} Information\n` +
                    `\`${prefix} help manager\` ∷ ${help_emojis["manager"]} Administration\n` +
                    `\`${prefix} help marriage\`∷ ${help_emojis["marriage"]} Marriages\n` +
                    `\`${prefix} help misc\`    ∷ ${help_emojis["misc"]} Miscellaneous\n` +
                    `\`${prefix} help mod\`     ∷ ${help_emojis["mod"]} Moderation\n` +
                    `\`${prefix} help music\`   ∷ ${help_emojis["music"]} Music\n` +
                    `\`${prefix} help nsfw\`    ∷ ${help_emojis["nsfw"]} NSFW\n` +
                    `\`${prefix} help public\`  ∷ ${help_emojis["public"]} Public\n` +
                    `\`${prefix} help reaction\`∷ ${help_emojis["reaction"]} Reaction\n` +
                    `\`${prefix} help utils\`   ∷ ${help_emojis["utils"]} Utilities\n` +
                    `\`${prefix} help genshin\` ∷ ${help_emojis["genshin"]} Genshin Impact`
                )
                .setColor('#C9A0DC')
                .setFooter({
                    text: `© Nia`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                })

            const select = new StringSelectMenuBuilder()
                .setCustomId("Commands")
                .setPlaceholder(`${message.author.globalName} select a category`)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Action`)
                        .setEmoji(help_emojis["action"])
                        .setValue("Action")
                        .setDescription("Interact with me and another member"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Anime`)
                        .setEmoji(help_emojis["anime"])
                        .setValue("Anime")
                        .setDescription("Anime Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Club`)
                        .setEmoji(help_emojis["club"])
                        .setValue("Club")
                        .setDescription("Club Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Configuration`)
                        .setEmoji(help_emojis["config"])
                        .setValue("Config")
                        .setDescription("Customize your server"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Currency`)
                        .setEmoji(help_emojis["currency"])
                        .setValue("Eco")
                        .setDescription("Currency Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Fun`)
                        .setEmoji(help_emojis["fun"])
                        .setValue("Fun")
                        .setDescription("Entertaiment Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Information`)
                        .setEmoji(help_emojis["info"])
                        .setValue("Info")
                        .setDescription("Information Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Administration`)
                        .setEmoji(help_emojis["manager"])
                        .setValue("Admin")
                        .setDescription("Manage your server"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Marriages`)
                        .setEmoji(help_emojis["marriage"])
                        .setValue("Marry")
                        .setDescription("Marriages commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Miscellaneous`)
                        .setEmoji(help_emojis["misc"])
                        .setValue("Misc")
                        .setDescription("Variaty of commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Moderation`)
                        .setEmoji(help_emojis["mod"])
                        .setValue("Mod")
                        .setDescription("Moderative Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Music`)
                        .setEmoji(help_emojis["music"])
                        .setValue("Music")
                        .setDescription("Music Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`NSWF`)
                        .setEmoji(help_emojis["nsfw"])
                        .setValue("NSWF")
                        .setDescription("NSWF commands (+18)"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Public`)
                        .setEmoji(help_emojis["nsfw"])
                        .setValue("Public")
                        .setDescription("Public Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Reaction`)
                        .setEmoji(help_emojis["reaction"])
                        .setValue("React")
                        .setDescription("Reaction Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Utilities`)
                        .setEmoji(help_emojis["utils"])
                        .setValue("Utils")
                        .setDescription("Utils Commands"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Genshin Impact`)
                        .setEmoji(help_emojis["genshin"])
                        .setValue("Genshin")
                        .setDescription("Genshin Impact Commands"),
                );
            const row = new ActionRowBuilder().addComponents(select);

            if (!args[0]) {
                return message.channel.send({ embeds: [embed], components: [row, button], ephemeral: true })
            }
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
