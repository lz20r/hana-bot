const client = require("../../index");
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

client.on("interactionCreate", async(interaction) => {

	if(interaction.isButton()){
    if(interaction.customId === "aceptaradmin"){
		
	 const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("daradmin")
        .setLabel("Aceptar")
        .setEmoji("✅")
        .setStyle("Success")
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
      .setTitle(`Felicitaciones haz sido aceptado para el rol de Admin`)
      .setColor("Green")
      .setImage(
        "https://cdn.discordapp.com/attachments/1044354959950487692/1080295733443448944/Copia_de_POLLOGANGBOTPLUS_3.png"
      )
      .setDescription(
        "Presiona el boton de **Aceptar** para obtener tu rol y cerrar el ticket"
      );

    await interaction.channel.send({
      content: `@everyone`,
      embeds: [embed],
      components: [button],
    });	
  }

if(interaction.customId === "daradmin"){

	const admin = interaction.guild.roles.cache.get(`1149036382614986912`);

    await interaction.member.roles.add(admin);

    await interaction.channel.delete();

  }	

if(interaction.customId === "quitaradmin"){
	await interaction.channel.delete();
  }

if(interaction.customId === "rechazaradmin"){
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
  }
}
	
});