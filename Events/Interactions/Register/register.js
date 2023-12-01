const client = require("../../../index");
const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } = require("discord.js"); 
const {
    Whishes,
    PC, Androide,iOS, Consola,
    Metodo1, Metodo2, Metodo3, MetodoManual,
} = require("../../../Embeds/General/register");
const {
    Devices, Return,
    Method1, Method2, Method3, Manual,
    Link, Back 
} = require("../../../Embeds/Botones/register");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "uid") {
            const UIDM = new ModalBuilder()
                .setCustomId("UID")
                .setTitle(`Bound UID`)
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setCustomId("UIDuserInput")
                            .setLabel("Bound UID")
                            .setStyle("Short")
                            .setRequired(true)
                            .setMaxLength(9)
                    )
                );
            await interaction.showModal(UIDM)
            const filter = (interaction) => interaction.customId === 'UIDuserInput';
            const modalSubmitInt = await interaction.awaitModalSubmit({ filter, time: 120000 }).then(
                interaction => { console.log(interaction) }
            )
        }
        if (interaction.customId === "Whishes") {
            await interaction.update({ embeds: [Whishes], components: [Devices, Return] })
        }

        if (interaction.customId === "HoYoLAB") {
            const HoYoLABM = new ModalBuilder()
                .setCustomId("HoYoLAB")
                .setTitle(`HoYoLAB`)
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setCustomId("HoYoLABUserInput")
                            .setLabel("HoYoLABUserInput")
                            .setStyle("Short")
                            .setRequired(true)
                            .setMaxLength(9)
                    )
                );
            await interaction.showModal(HoYoLABM)
            const filter = (interaction) => interaction.customId === 'HoYoLABUserInput';
            const modalSubmitInt = await interaction.awaitModalSubmit({ filter, time: 120000 }).then(interaction => { console.log(interaction) })
        }
    }
    if (interaction.isButton()) {
        if (interaction.customId === "PC") {
            await interaction.update({ embeds: [PC], components: [Method1, Link] })
        }
        if (interaction.customId === "Androide") {
            await interaction.update({ embeds: [Androide], components: [Method1, Link] })
        }
        if (interaction.customId === "iOS") {
            await interaction.update({ embeds: [iOS], components: [Method1, Link] })
        }
        if (interaction.customId === 'Console') {
            await interaction.update({ embeds: [Consola] })
        }

        if (interaction.customId === "Method1") {
            await interaction.update({ embeds: [Metodo1], components: [Method1, Link] })
        }
        if (interaction.customId === "Method2") {
            await interaction.update({ embeds: [Metodo2], components: [Method2, Link] })
        }
        if (interaction.customId === "Method3") {
            await interaction.update({ embeds: [Metodo3], components: [Method3, Link] })
        }
        if (interaction.customId === "Manual") {
            await interaction.update({ embeds: [MetodoManual], components: [Manual, Link] })
        }

        if (interaction.customId === "link") {
            const Link = new ModalBuilder()
                .setCustomId("Link")
                .setTitle(`Geshink Kinako`)
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setCustomId("LinkInput")
                            .setLabel("your desire history url")
                            .setPlaceholder("https://webstatic-sea.mihoyo.com/...")
                            .setStyle("Short")
                            .setRequired(true)
                    )
                );
            await interaction.showModal(Link)
            const filter = (interaction) => interaction.customId === 'LinkInput';
            const modalSubmitInt = await interaction.awaitModalSubmit({ filter, time: 120000 }).then(
                interaction => { console.log(interaction) }
            )
        }
    }

    if (interaction.isButton()) {
        const Main = new EmbedBuilder()
            .setTitle(`Genshin Natsumi Registration`)
            .setDescription(`**${interaction.user.globalName} register your genshin account in Genshin Natsumi.** `)
            .setAuthor({
                name: "Requested by " + interaction.user.globalName,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }).setColor("#C9A0DC")
            .addFields(
                { name: '\u200A', value: '\u200A' },
                { name: 'Bound UID', value: `❌ Not linked`, inline: true },
                { name: 'Wish history', value: `❌ Not linked`, inline: true },
                { name: 'HoYoLAB', value: `❌ Not linked`, inline: true },)
            .setFooter({ text: `© Nia`, iconURL: "https://i.redd.it/fi4oa3o2w7t51.png" })

        if (interaction.customId == "return") {
            await interaction.update({ embeds: [Main], components: [Back] })
        }
        if (interaction.customId == "x") {
            const back = new ActionRowBuilder().addComponents(
                interaction.message.delete()
            );
        }
    }
})



