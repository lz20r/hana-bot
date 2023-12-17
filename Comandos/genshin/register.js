const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const commands = require("../../Handlers/commands");
const client = require("../../index");



module.exports = {
    name: "register",
    category: "Genshin",
    description: "Form registration",
    alias: ["reg", "regist", "Reg", "Regist", "登録する"],


    async execute(message, args) {
        const { prefix } = message
        const { db } = client
        try {
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`uid`)
                    .setLabel(`Bound UID`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`Whishes`)
                    .setLabel(`Wish history`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`HoYoLAB`)
                    .setLabel(`HoYoLAB`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`close`)
                    .setLabel(`X`)
                    .setStyle(ButtonStyle.Danger),
            );
            const embed = new EmbedBuilder()
                .setTitle(`Genshin Natsumi Registration`)
                .setDescription(`**${message.author.globalName} register your genshin account in Genshin Natsumi.** `)
                .setAuthor({
                    name: "Requested by " + message.author.globalName,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setColor("#C9A0DC")
                .addFields(
                    { name: '\u200A', value: '\u200A' },
                    { name: 'Bound UID', value: `❌ Not linked`, inline: true },
                    { name: 'Wish history', value: `❌ Not linked`, inline: true },
                    { name: 'HoYoLAB', value: `❌ Not linked`, inline: true },
                )
                .setFooter({
                    text: `© Nia`,
                    iconURL: "https://i.redd.it/fi4oa3o2w7t51.png"
                })
            if (!args[0]) {
                return message.channel.send({ embeds: [embed], components: [button], ephemeral: true })
            }
            const command = commands.get(args[0]) || commands.find(c => c.alias && c.alias.includes(args[0]));
            if (!command) return message.channel.send("That command doesn't exist!");
        } catch (error) {
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
    },
};
