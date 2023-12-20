const Hana = require('../../core/client/Client');
client = Hana; 
const afk = require("../../Schemas/afk");
const { EmbedBuilder } = require("discord.js");


client.on("messageCreate", async (message) => {
  
    if (message.channel.type === 'dm' || message.author.bot) {
        return;
    }
    await afk(message);
    const [row] = await client.db.query(`SELECT prefix FROM prefijos WHERE guildId = ?`, [message.guild.id])

    const prefix = row.length > 0 ? row[0].prefix : prefix 
    const { db } =  require("../../Handlers/commands");
    //const prefix = await db.get(`prefix.${message.guild.id}`) || Prefix;
    const logChannelId = "1185953106891124896"; // ID del canal de registro

    if (message.content.toLowerCase().startsWith("prefix") && message.author.id == "1033160523044376616") {
        return message.reply(`My prefix is ${prefix}`);
    }


    if (!message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd = client.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));

    if (cmd) { 
        message.delete();
        message.prefix = prefix
        cmd.execute(message, args, client);
        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor("#c1d5db")
                .setTitle('New Command executed')
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .addFields(
                  {
                    name: 'Author',
                    value: `<@!${message.author.id}> (${message.author.id})`,
                    inline: true,
                  },
                  {
                    name: 'Command',
                    value: `\`${prefix}${args[0]}\``,
                    inline: true,
                  },
                  {
                    name: 'Command ID',
                    value: `${message.id}`,
                    inline: true,
                  },
                  {
                    name: 'Channel',
                    value: `**${message.channel.name}** (${message.channel.id})`,
                    inline: true,
                  },
                  {
                    name: 'Guild',
                    value: `**${message.guild.name}** (${message.guild.id})`,
                    inline: true,
                  },
                  {
                    name: 'Global Name',
                    value: `${message.author.username} (${message.author.displayName})`,
                    inline: true,
                  }
                ) 
                .setTimestamp();
            logChannel.send({ content: `<@!1033160523044376616>`, embeds: [logEmbed], allowedMentions: { repliedUser: false } })
        }
    }
});
