const client = require("../../index");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextInputBuilder,
  ModalBuilder,
} = require("discord.js");
const roleSchema = require("../../Schemas/verification");
const randomString = require("randomized-string");


client.on("interactionCreate", async(interaction) => {
     
  if (interaction.isButton()) {
   if(interaction.customId === "verifyMember") {
        
          const verifyRoleId = await roleSchema.findOne({
            guildId: interaction.guild.id,
          });

          if (!verifyRoleId) {
            return interaction.reply({ content:
                "You have not set a verification role yet! Use `/setrole` to set one!",
            });
          }

          const randomToken = randomString
            .generate({ length: 5, charset: "hex" })
            .toUpperCase();

          if (interaction.member.roles.cache.some((role) => role.id === verifyRoleId.roleId)) {
            return interaction.reply({ embeds: [
                new EmbedBuilder()
                  .setDescription("You have already verified that you are a not robot!")
                  .setColor("C9A0DC")
              ], ephemeral: true });
          }

          const modal = new ModalBuilder()
            .setCustomId("verifyUserModal")
            .setTitle(`Verification code: ${randomToken}`)
            .setComponents(
              new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                  .setCustomId("veryUserInput")
                  .setLabel("Verification code in title:")
                  .setStyle("Short")
                  .setRequired(true)
                  .setMaxLength(5)
              )
            );  

          await interaction.showModal(modal);
          const modalSubmitInt = await interaction.awaitModalSubmit({ filter: (i) => {
                return true;
              }, time: 10000 }).catch((e) => {
              console.log(e);
            });

          if (modalSubmitInt.fields.getTextInputValue("veryUserInput").toUpperCase() === randomToken) {
            const role = interaction.guild.roles.cache.get(verifyRoleId.roleId);

            if (!role) return interaction.reply({ content: "Role not found!", ephemeral: true });
			  
            await interaction.member.roles.add(role).then((m) => {
              interaction.followUp({ embeds: [
                    new EmbedBuilder()
                      .setTitle("Verification Successful!")
                      .setDescription(`You have been verified and have been given the ${role.name} role!`)
                      .setColor("Green"),
                  ], ephemeral: true }).catch((err) => {
                  console.log(err);
                });
            });
          }

          if ( modalSubmitInt.fields.getTextInputValue("veryUserInput").toUpperCase() !== randomToken) {
            interaction.followUp({ content: "You have entered the wrong code!", ephemeral: true });
          }
       
        }

    
      }
	});