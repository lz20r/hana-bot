const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: {
    name: `darhelper`,
  },
  async execute(interaction, client) {
    const helper = interaction.guild.roles.cache.get(`1150885108568555520`);

    await interaction.member.roles.add(helper);

    await interaction.channel.delete();
  },
};
