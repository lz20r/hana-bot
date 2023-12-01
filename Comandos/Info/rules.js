const { EmbedBuilder } = require("discord.js");
const { User } = require("../../Schemas/User");
const client = require("../../index");



module.exports = {
    name: 'rules',
    category: 'Information',
    description: 'You will see the rules of the server.',
    alias: ['rules', 'reglas', 'reglasdelserver', 'rulesofserver'],
    usage: 'rules',
    options: [
        {
            name: 'channel',
            description: 'The channel you want to send the rules of',
            type: 'CHANNEL',
            required: true
        }
    ],

    async execute(message, args) {
        const server = message.guild.id;
        const prefix = await db.get("prefix." + server)
        try {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle(`📢 | ${message.guild.name}'s Rules`)
                .setColor("#C9A0DC")
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setImage(
                    "https://cdn.discordapp.com/attachments/1044354959950https://i.pinimg.com/originals/a7/6c/f3/a76cf3c28bd0895044f9dfecd1cb9cd0.jpg487692/1046098343622885466/REGLAS_1.png"
                )
                .setDescription(
                    `Here you have the list of server rules, it is very important that you are aware of these to have a good stay and coexistence on the server.`
                )
                .addFields(
                    {
                        name: `1.-Respect all users.`,
                        value:
                            "`Regardless of whether it is another Nationality/Language/Race. We are here to have a good time and be entertained.`",
                    },
                    {
                        name: `2.- Do not have NSFW themes or images.`,
                        value:
                            "`Distribution of NSFW is prohibited. Let's keep this server appropriate for all members`",
                    },
                    {
                        name: `3.- Use the channels correctly.`,
                        value:
                            "`Do not use the channels that are not made for what you require since each thing has its corresponding channel.`",
                    },
                    {
                        name: `4.- Do not spam/Flood/Walltext/Excessive Mentions.`,
                        value: "`Any of these actions will be sanctioned`",
                    },
                    {
                        name: `5.- Maintain a healthy coexistence.`,
                        value:
                            "`If any user is disturbing the server or private channels, they can be reported and the corresponding measures will be taken.`",
                    },
                    {
                        name: `6.- Do not send links or promote your server.`,
                        value: "`These actions will be sanctioned`",
                    },
                    {
                        name: `7.- Forbidden to pass an IP Logger.`,
                        value: "`This will result in PERMANENT Ban of the account.`",
                    },
                    {
                        name: `8.- Do not use NICKNAMES, inappropriate profile PHOTOS.`,
                        value:
                            "`This includes names with special letters or numbers, long names, and excessive emojis. Prevent people from impersonating others or using offensive names and avatars.`",
                    },
                    {
                        name: `9.- No se tolerará ningún tipo de acoso, sexismo, racismo o discurso de odio.`,
                        value: "`Todas estas acciones seran sancionadas`",
                    },
                    {
                        name: `10.- It is totally prohibited to ask for codes.`,
                        value: "`The main idea of this server is that you can learn to create your own bot, so do not ask for free codes.`",
                    },
                    {
                        name: `11.- Respect Discord regulations`,
                        value: "`On this server we respect the [Discord Regulations] (https://discord.com/guidelines)`",
                    },
                )
                .setFooter({
                    text: "`On this server we respect the Discord ToS https://discord.com/terms`",
                });

            await message.channel.send({ embeds: [embed] });
            await message.reply({
                content: `Message sent successfully`
            });
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
    }
}
