const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const Discord = require("discord.js");
const levels = require("../../Schemas/niveles");
const lvl = require("../../Schemas/configlvl"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Mira tú rango de nivel en el servidor")
        .addUserOption(x => x.setName('usuario').setDescription('Menciona un Usuario').setRequired(false)),

    async execute(interaction, client) {
        try {
            let member = interaction.options.getUser('usuario') || interaction.user;
            const data = await levels.findOne({ guildId: interaction.guild.id, userId: member.id });
            if (!data) return interaction.reply({ content: "<:mtmal:1175444425002975312> `|` No encontre un progreso registrado!", ephemeral: true });
            
            const datas = await lvl.findOne({ GuildId: interaction.guild.id });

            if (datas.activado === false) return interaction.reply({ content: "<:off:1009847882972667934> `|` El sistema de niveles no está activado en este servidor!", ephemeral: true });

            let dataGlobal = await levels.find({ guildId: interaction.guild.id }).sort([["xp", "descending"]]).exec();
            if (!dataGlobal) return interaction.reply({ content: "<:mtoff:1175444941896429578> `|` Nadie tiene un Progreso registrado en este servidor!", ephemeral: true });

            const rankCard = new Rank()
                .setAvatar(member.displayAvatarURL({ size: 2048, extension: "png" }))
                .setCurrentXP(data.xp)
                .setRequiredXP(data.limit)
                .setLevel(data.level)
                .setStatus(interaction.member.presence.status || "offline")
                .setProgressBar("#066980")
                .setOverlay("#012229")
                .setBackground("IMAGE", "https://media.discordapp.net/attachments/876553669380821003/1150229683254866030/R.jpeg?width=708&height=398")
                .setDiscriminator("0007")
                .setUsername(member.username)
                .setRank(dataGlobal.findIndex(dataUser => dataUser.userId === member.id) + 1);

            const buffer = await rankCard.build(); 
            const attachment = new AttachmentBuilder(buffer, "targeta_rank.png");
            interaction.deferReply();
            interaction.deleteReply();
            interaction.channel.send({ files: [attachment] });

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
    }
};
