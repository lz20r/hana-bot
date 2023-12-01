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
    name: `aceptarmod`,
  },
  async execute(interaction, client) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`darmod`)
        .setLabel(`Aceptar`)
        .setEmoji(`✅`)
        .setStyle(ButtonStyle.Success)
    );

    const hperm = interaction.member.permissions.has(
      PermissionFlagsBits.Administrator
    );

    if (!hperm)
      return interaction.reply({
        content: `No puedes utilizar este boton`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle(`Felicitaciones haz sido aceptado para el rol de Moderador`)
      .setColor("Green")
      .setImage(
        "https://cdn.discordapp.com/attachments/1044354959950487692/1080295733443448944/Copia_de_POLLOGANGBOTPLUS_3.png"
      )
      .setDescription(
        `Presiona el boton de **Aceptar** para obtener tu rol y cerrar el ticket`
      );

    await interaction.channel.send({
      content: `@everyone`,
      embeds: [embed],
      components: [button],
    });
  },
};
