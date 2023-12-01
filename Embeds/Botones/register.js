const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, MessageActionRowa } = require("discord.js");

const Link = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`link`).setLabel(`enter link`).setStyle(ButtonStyle.Success)
)

const Return = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`return`).setLabel(`Back`).setStyle(ButtonStyle.Secondary)
)

const Back = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`uid`).setLabel(`Bound UID`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Whishes`).setLabel(`Wish history`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`HoYoLAB`).setLabel(`HoYoLAB`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`close`).setLabel(`X`).setStyle(ButtonStyle.Danger),
);

const Devices = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`PC`).setLabel(`PC`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Androide`).setLabel(`Androide`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`iOS`).setLabel(`iOS`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Console`).setLabel(`Console`).setStyle(ButtonStyle.Primary),
)

const Method1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`return`).setLabel(`Back`).setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(`Method1`).setLabel(`Method1`).setStyle(ButtonStyle.Primary).setDisabled(true),
    new ButtonBuilder().setCustomId(`Method2`).setLabel(`Method2`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Method3`).setLabel(`Method3`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Manual`).setLabel(`Manual`).setStyle(ButtonStyle.Primary),
)

const Method2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`return`).setLabel(`Back`).setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(`Method1`).setLabel(`Method1`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Method2`).setLabel(`Method2`).setStyle(ButtonStyle.Primary).setDisabled(true),
    new ButtonBuilder().setCustomId(`Method3`).setLabel(`Method3`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Manual`).setLabel(`Manual`).setStyle(ButtonStyle.Primary),
)

const Method3 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`return`).setLabel(`Back`).setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(`Method1`).setLabel(`Method1`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Method2`).setLabel(`Method2`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Method3`).setLabel(`Method3`).setStyle(ButtonStyle.Primary).setDisabled(true),
    new ButtonBuilder().setCustomId(`Manual`).setLabel(`Manual`).setStyle(ButtonStyle.Primary),
)

const Manual = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`return`).setLabel(`Back`).setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(`Method1`).setLabel(`Method1`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Method2`).setLabel(`Method2`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Method3`).setLabel(`Method3`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`Manual`).setLabel(`Manual`).setStyle(ButtonStyle.Primary).setDisabled(true),
)

module.exports = { Devices, Return, Method1, Method2, Method3, Manual, Link, Back }