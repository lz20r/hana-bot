const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("I'll tell you about the server"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client, message) {
        try {
            const { guild } = interaction;

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setURL(`https://www.youtube.com/channel/UCmQ60mxmGj9UXRN-m9nrFOA`)
                    .setLabel(`Toto's Youtube channel`)
                    .setEmoji(`🎥`)
                    .setStyle(ButtonStyle.Link)
            );

            const {
                createdTimestamp,
                ownerId,
                description,
                members,
                memberCount,
                channels,
            } = guild;

            const botCount = members.cache.filter((member) => member.user.bot).size;
            const getChannelTypeSize = (type) =>
                channels.cache.filter((channel) => type.includes(channel.type)).size;

            const totalChannels = getChannelTypeSize([
                ChannelType.GuildText,
                ChannelType.GuildNews,
                ChannelType.GuildVoice,
                ChannelType.GuildStageVoice,
                ChannelType.GuildForum,
                ChannelType.GuildPublicThread,
                ChannelType.GuildPrivateThread,
                ChannelType.GuildNewsThread,
                ChannelType.GuildCategory,
            ]);

            const embed = new EmbedBuilder()
                .setColor(`C9A0DC`)
                .setImage(guild.bannerURL({ size: 1024 }))
                .setAuthor({
                    name: `${guild.name}`,
                    iconURL: `${guild.iconURL({ dynamic: true })}`,
                })
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addFields(
                    {
                        name: "📃 Descripción",
                        value: [
                            `${description}`,
                        ].join("\n"),
                    },
                    {
                        name: "🌎 | General",
                        value: [
                            `💾 **ID:** ${guild.id}`,
                            `📆 **Creado:** <t:${parseInt(createdTimestamp / 1000)}:R>`,
                            `👑 **Dueño:** <@${ownerId}>`,
                            `🔗 **URL:** discord.gg/${guild.vanityURLCode || "None"}`,
                        ].join("\n"),
                    },
                    {
                        name: `👥 | Miembros [${memberCount}]`,
                        value: [
                            `👤 Usuarios: ${guild.memberCount - botCount}`,
                            `🤖 Bots: ${botCount}`,
                            ``,
                            ``,
                        ].join("\n"),
                        inline: true,
                    },
                    {
                        name: "🔰 | Nitro Boost",
                        value: [
                            `Nivel: ${guild.premiumTier}`,
                            `Boosts: ${guild.premiumSubscriptionCount}`,
                        ].join("\n"),
                        inline: true,
                    },
                    {
                        name: `Canales (${totalChannels})`,
                        value: [
                            `💬 **Texto:** ${getChannelTypeSize([
                                ChannelType.GuildText,
                                ChannelType.GuildForum,
                                ChannelType.GuildNews,
                            ])}`,
                            `🎙 **Voz:** ${getChannelTypeSize([
                                ChannelType.GuildVoice,
                                ChannelType.GuildStageVoice,
                            ])}`,
                            `🧵 **Hilos:** ${getChannelTypeSize([
                                ChannelType.GuildPublicThread,
                                ChannelType.GuildPrivateThread,
                                ChannelType.GuildNewsThread,
                            ])}`,
                            `📕 **Categorias:** ${getChannelTypeSize([
                                ChannelType.GuildCategory,
                            ])}`,
                        ].join("\n"),
                        inline: true,
                    },
                    { name: "Banner", value: guild.bannerURL() ? "** **" : "None" }
                );

            interaction.reply({ embeds: [embed], components: [button] });
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
