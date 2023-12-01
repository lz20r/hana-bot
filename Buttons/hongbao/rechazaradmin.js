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
    name: `rechazaradmin`,
  },
  async execute(interaction, client) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`quitaradmin`)
        .setLabel(`Aceptar`)
        .setEmoji(`✅`)
        .setStyle(ButtonStyle.Danger)
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
      .setTitle(
        `Hola, lamentablemente no haz sido aceptado para el rol de Admin, puedes volver a intentarlo mas adelante`
      )
      .setColor("Red")
      .setImage(
        "https://cdn.discordapp.com/attachments/1044354959950487692/1080297155618680903/Copia_de_POLLOGANGBOTPLUS_4.png"
      )
      .setDescription(`Presiona el boton de **Aceptar** para cerrar el ticket`);

    await interaction.channel.send({
      content: `@everyone`,
      embeds: [embed],
      components: [button],
    });
  },
};
