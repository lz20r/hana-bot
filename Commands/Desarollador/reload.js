const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, client} = require("discord.js");

const loadCommands = require("../../Handlers/commands.js");
const loadEvents = require("../../Handlers/events.js");
module.exports = { 
    //developer: true, // Agrega una propiedad developer para marcar que solo el creador del bot puede usar este comando
    data: new SlashCommandBuilder()
        .setName(`reload`)
        .setDescription(`Recarga tus comandos/eventos`)
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
            .setName(`option`) 
            .setDescription(`Di qué sección quieres reiniciar.`)
            .setRequired(true)
            .addChoices(
                {name: "eventos", value: "events"},// tran
                {name: "comandos", value: "commands"}, // 
            )),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {client} client
     */

    execute(interaction, client) {
        //console.log("La interacción es la siguiente: ", interaction);
        try {
            if (interaction.user.id !== "1033160523044376616") {
                // Verifica si el comando está marcado como exclusivo del desarrollador
                return interaction.reply({
                    content: "Este comando solo puede ser utilizado por el desarrollador.",
                    ephemeral: true,
                });
            }

            // Verifica si el autor de la interacción es igual al creador del bot


            const subCommand = interaction.options.getString("option"); // oy tonto xD
            console.log(subCommand) //¿yo no? XD
            switch (subCommand) {//YO estoy viendo muerte.
                case "events":
                    {
                        // for (const [key, value] of client.events){
                        //     client.removeListener(`${key}`, value, true);
                        // }
                        loadEvents(client);
                         interaction.reply({
                            content: `Los eventos fueron recargados`,
                            ephemeral: true,
                        });
                    }
                    break;
                case "commands":
                    {
                        console.log("recargando comandos");
                        loadCommands(client);
                    return interaction.reply({
                            content: `Los comandos fueron recargados`,
                            ephemeral: true,
                        });
                    }
                    break;
            }
        } catch (e) {
            console.log(e);
            interaction.channel.send("Ocurrió un error al ejecutar este comando");
        } finally {
            console.log( `\n💭  [CMD] ${interaction.user.globalName} [${interaction.user.tag}] ha usado el comando /${this.data.name} en el servidor ${interaction.guild.name}`)
        }
    },
};
 