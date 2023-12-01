const { SlashCommandBuilder,
    ActionRowBuilder,
    PermissionFlagsBits,
    ChannelType, EmbedBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify-channel')
        .setDescription('Setup the verification channel bot!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) =>
            option.setName("channel")
                .setDescription("Channel to send the verification message to.")
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {

        try {
            const channel = interaction.options.getChannel("channel") || interaction.channel

            const embed = new EmbedBuilder()
                .setDescription(
                    "Welcome to the server! Please authorize yourself by clicking the button below! When you verify you will be granted the 'verified' role"
                )
                .setColor("Navy")
                .setTitle(`Welcome to ${interaction.guild.name}!`);

            const button = new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setCustomId("verifyMember")
                    .setLabel("Verify")
                    .setStyle("Primary")
            );

            channel.send({ embeds: [embed], components: [button] });



            interaction.reply({
                content: 'Successfully setup the verification channel!', ephemeral: true
            })

        } catch (error) {
            console.log(error)
            message.channel.send(`Ha ocurrido un error al ejecutar el comando, por favor contacta con el desarrollador del bot`)
        } finally {
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }


    }
}