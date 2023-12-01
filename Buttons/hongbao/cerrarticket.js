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
    name: `cerrarticket`,
  },
  async execute(interaction, client) {
    const hperm = interaction.member.permissions.has(
      PermissionFlagsBits.Administrator
    );

    if (!hperm)
      return interaction.reply({
        content: `No puedes utilizar este boton`,
        ephemeral: true,
      });

    await interaction.channel.delete();
  },
};
