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
    name: `darmod`,
  },
  async execute(interaction, client) {
    const mod = interaction.guild.roles.cache.get(`1150763435685068830`);

    await interaction.member.roles.add(mod);

    await interaction.channel.delete();
  },
};
