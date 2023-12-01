const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    CommandInteractionOptionResolver,
} = require("discord.js");

const roleSchema = require("../../Schemas/verification");
const mongoose = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify-role")
        .setDescription("Sets the verification Role!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption((option) =>
            option
                .setName("role")
                .setDescription("Role to set the verification role to.")
                .setRequired(true)
        ),

    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {

        try {
            let role = interaction.options.getRole("role");
            const roleId = await roleSchema.findOne({ roleId: role.id });

            if (!roleId) {
                verifyRole = await new roleSchema({
                    guildId: interaction.guild.id,
                    roleId: role.id,
                });

                await verifyRole.save().catch(console.error);
                await interaction.reply({
                    content: `Successfully set the verification role to ${role.name}!`,
                    ephemeral: true
                })
            } else {
                await verifyRole.save().catch(console.error);
                await interaction.reply({
                    content: 'The role is already in the database!',
                    ephemeral: true
                })
            }

        } catch (error) {
            console.log(error)
            message.channel.send(`Ha ocurrido un error al ejecutar el comando, por favor contacta con el desarrollador del bot`)
        } finally {
            console.log(`\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }

    },
};

