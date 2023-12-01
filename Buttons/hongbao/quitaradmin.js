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
    name: `quitaradmin`,
  },
  async execute(interaction, client) {
    await interaction.channel.delete();
  },
};
