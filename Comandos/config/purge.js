const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { ChannelType } = require("discord-api-types/v9");
const client = require("../../index");


module.exports = {
    name: "purge",
    category: 'Configuration',
    description: 'Deletes messages from the current channel.',
    alias: ["C", "P", "c", "clear", "クリア", "なつみクリア"],
    permissions: PermissionFlagsBits.ManageMessages,
    addIntegerOption: [{
        name: "messagecount",
        description: "Message amount to be cleared",
        required: true,
        min: 100,
        max: 100
    }],
    async execute(message, args) {
        const { prefix } = message
        const { db } = client
        if (args[0] == "all") {
            let n = 0
            message.channel.send("Deleting everything...") // editaste esto, verdad?
            try {
                while (n < 10000) {
                    try {
                        message.channel.bulkDelete(100, true)
                        n++
                    }
                    catch (e) {
                        n = 10000
                        console.log("Error")
                    }
                }
                await message.channel.send("Everything is being erased.")
            }
            catch (e) {
            }
        } else {
            try {
                const messageCount = Number(args[0])
                if (!messageCount) return message.channel.send("**Enter the number of messages you want to delete**" + ` ${prefix}purge <messageCount>`)
                if (parseInt(args[0]) > 100) {
                    try {
                        console.log("1")
                        let i = parseInt(args[0])
                        while (i > 100) {
                            i = i - 100
                            message.channel.bulkDelete(100, true)
                        }
                        message.channel.bulkDelete(i, true)
                    } catch (e) {
                        message.channel.send("All messages were deleted **possibles**.")
                    }
                } else {
                    message.channel.messages.fetch({ limit: messageCount })
                        .then(async msgs => {
                            if (message.channel.type === ChannelType.DM) return;
                            const deletedMessages = await message.channel.bulkDelete(msgs, true)
                            if (deletedMessages.size === 0) {
                                message.reply("No messages were deleted.")
                            } else {
                                const msg = await message.channel.send(`Successfully deleted ${deletedMessages.size} message(s)`)
                                setTimeout(() => msg.delete(), 5000)
                            }
                        })
                }
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
}
