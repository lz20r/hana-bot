const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: {
    name: `postmod`,
  },
  async execute(interaction, client) {
    const embed2 = new EmbedBuilder()
      .setTitle(
        `Responde las siguientes preguntas para ver si eres elegido para recibir el rol de Moderador:`
      )
      .setColor("Yellow")
      .setDescription(
        `**1.-** ¿Cuantos años tienes? \n**2.-** ¿Cuanto tiempo llevas en el servidor? \n**3.-** ¿Porque te interesa llevar el rol de moderador? \n**4.-** ¿Tienes experiencia siendo Moderador en otros servidores? \n**5.-** ¿Cuanto tiempo libre tienes para moderar? \n**6.-** ¿Por que crees que tu mereces ser moderaror y otro usuario no?`
      )
      .setFooter({
        text: `Puedes agregar datos extras que creas que te pueden ayudar con tu postulacion. | Recuerda que nos guiaremos por tu historial en el servidor para otorgarte el rol.`,
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`aceptarmod`)
        .setLabel(`Aceptar`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`rechazarmod`)
        .setLabel(`Rechazar`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId(`cerrarticket`)
        .setLabel(`Cerrar ticket`)
        .setStyle(ButtonStyle.Danger)
    );

    const channel = await interaction.guild.channels.create({
      name: `ticket mod ${interaction.user.tag}`,
      type: ChannelType.GuildText,
    });

    channel.permissionOverwrites.create(interaction.user.id, {
      ViewChannel: true,
      SendMessages: true,
    });
    channel.permissionOverwrites.create(channel.guild.roles.everyone, {
      ViewChannel: false,
      SendMessages: false,
    });

    await interaction.reply({
      content: `Tu ticket para postularte al rol de **Moderador** se creo correctamente <#${channel.id}>`,
      ephemeral: true,
    });

    channel.send({ embeds: [embed2], components: [button] });
  },
};
