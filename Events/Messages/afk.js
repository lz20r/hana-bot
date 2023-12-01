const afk = require("../../Schemas/afk")
const client = require("../../index")
const { EmbedBuilder } = require("discord.js");
require("../Messages/messageCreate")

client.on("messageCreate", async (message) => {
    let data = await afk.findOne({ guildId: message.guild.id, userId: message.author.id })
    if (data) {
        const date = await afk.findOneAndDelete({
            userId: message.author.id,
        });
        message.channel.send({
            embeds: [new EmbedBuilder()
                .setTitle("<:mtbruh:1158367269668257874> AFK Removed")
                .setDescription(`<:mtuwu:1158367351180361798> You're back!\n<:mtdormido:1158368170516680794> your afk mode has been removed.\n\n <:mtclock:1158430206202237080> AFK time: <t:${Math.floor(data.TimeAgo / 1000)}:R>`)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setFooter({
                    text: "Your afk has been removed successfully.",
                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                })
                .setColor("cca9dd")
                .setTimestamp()]
        }).then(v => {
            setTimeout(() => {
                v.delete()
            }, 10000)
        })
    }
    let member = message.mentions.members.first()
    if (member) {
        const afk1 = require("../../Schemas/afk")
        let data1 = await afk1.findOne({ guildId: message.guild.id, userId: member.user.id })
        if (data1) {
            const embed2 = new EmbedBuilder()
                .setTitle("<:mtnooop:1158367314555703326> AFK Active")
                .setDescription(`<:mtdormido:1158368170516680794> ${member.user.globalName} not available.\n\n<a:MT_noted:1158115594651041863> Reason: ${data1.Reason}\n\n <:mtclock:1158430206202237080> AFK Time: <t:${Math.floor(data1.TimeAgo / 1000)}:R>`)
                .setColor("#cca9dd")
                .setFooter({
                    text: "Sorry, but this user is afk.",
                    iconURL: message.user.displayAvatarURL({ dynamic: true })
                })
                message.channel.send({ embeds: [embed2] }).then(v => {
                    setTimeout(() => {
                        v.delete()
                    }, 100000)
                }
            )
        }
    }
});
