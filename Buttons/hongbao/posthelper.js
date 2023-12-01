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
    name: `posthelper`,
  },
  async execute(interaction, client) {
    const embed2 = new EmbedBuilder()
      .setTitle(
        `Responde las siguientes preguntas para ver si eres elegido para recibir el rol de Helper:`
      )
      .setColor("Yellow")
      .setDescription(
        `**1.-** ¿Cuantos años tienes? \n**2.-** ¿Cuanto tiempo llevas en el servidor? \n**3.-** ¿Porque te interesa llevar el rol de helper? \n**4.-** ¿Tienes experiencia siendo Helper en otros servidores? \n**5.-** ¿Cuanto tiempo libre tienes para ayudar? \n**6.-** ¿Que nivel de programacion crees tener?`
      )
      .setFooter({
        text: `Puedes agregar datos extras que creas que te pueden ayudar con tu postulacion. | Recuerda que nos guiaremos por tu historial en el servidor para otorgarte el rol.`,
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`aceptarhelper`)
        .setLabel(`Aceptar`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`rechazarhelper`)
        .setLabel(`Rechazar`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId(`cerrarticket`)
        .setLabel(`Cerrar ticket`)
        .setStyle(ButtonStyle.Danger)
    );

    const channel = await interaction.guild.channels.create({
      name: `ticket helper ${interaction.user.tag}`,
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
      content: `Tu ticket para postularte al rol de **Helper** se creo correctamente <#${channel.id}>`,
      ephemeral: true,
    });

    channel.send({ embeds: [embed2], components: [button] });
  },
};
