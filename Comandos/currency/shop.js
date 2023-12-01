const {
    Discord,
    EmbedBuilder,
    ButtonBuilder, ButtonStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    Embed,
} = require("discord.js");
let server;
let prefix;

const commands = require("../../Handlers/commands");


const client = require("../../index");
const items = require("../../json/shop");

module.exports = {
    name: "shop",
    description: "this command if for shop\n",
    category: "Currency",
    alias: ['s', "S", "Shop", "shop", "tieda"],
    execute: async (message, args) => {

        server = message.guild.id;
        prefix = await db.get("prefix." + server)

        const shop_emojis = {
            "items": `<:MT_Bag:1173254591584948364>`,
            "buffs": `<:MT_Buffs:1158115551239995534>`,
            "collectable": `<:MT_Collectable:1173201565948059649>`,
            "consumable": `<:MT_Consumable:1173202760511013006>`,
            "event": `<:MT_Event:1173254591584948364>`,
            "tool": `<:MT_Tool:1173254591584948364>`,
            "key": `<:MT_Key:1173254591584948364>`,
            "loot": `<:MT_Loot:1173254591584948364>`,
            "pet": `<:MT_Pet:1173254591584948364>`,
            "material": `<:MT_Material:1173254591584948364>`,
            "potion": `<:MT_Potion:1173254591584948364>`,
            "improvement": `<:MT_Improvement:1173254591584948364>`,
            "mission": `<:MT_Mission:1173254591584948364>`,
            "protection": `<:MT_Protection:1173254591584948364>`,
            "roll": `<:MT_Roll:1173254591584948364>`,
        }

        try {
            const Shop = new EmbedBuilder()
                .setTitle(`**${shop_emojis["bag"]} ${client.user.username}'s Shop**`)
                .setColor("#C9A0DC")

                .setDescription(
                    `Hello ${message.author.globalName}! Welcome to my little store k.mmt:\n` +
                    `You can buy by writing: /shop buy\n\n` +
                    `**Item list available:**\n`
                )


                .setFooter({
                    text: `© Nia`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                })
            const elements = new StringSelectMenuBuilder()
                .setCustomId("Commands")
                .setPlaceholder(`${message.author.globalName} select a category`)
                .addOptions([
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Whole items`)
                        .setEmoji(shop_emojis["items"])
                        .setValue("Whole items"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Buffs`)
                        .setEmoji(shop_emojis["buffs"])
                        .setValue("Buffs"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Collectable`)
                        .setEmoji(shop_emojis["collectable"])
                        .setValue("Collectable"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Consumable`)
                        .setEmoji(shop_emojis["consumable"])
                        .setValue("Consumable"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Event`)
                        .setEmoji(shop_emojis["event"])
                        .setValue("Event"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Tool`)
                        .setEmoji(shop_emojis["tool"])
                        .setValue("Tool"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Key`)
                        .setEmoji(shop_emojis["key"])
                        .setValue("Key"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Loot`)
                        .setEmoji(shop_emojis["loot"])
                        .setValue("Loot"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Pet`)
                        .setEmoji(shop_emojis["pet"])
                        .setValue("Pet"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Material`)
                        .setEmoji(shop_emojis["material"])
                        .setValue("Material"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Improvement`)
                        .setEmoji(shop_emojis["improvement"])
                        .setValue("Improvement"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Mission`)
                        .setEmoji(shop_emojis["mission"])
                        .setValue("Mission"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Potion`)
                        .setEmoji(shop_emojis["potion"])
                        .setValue("Potion"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Protection`)
                        .setEmoji(shop_emojis["protection"])
                        .setValue("Protection"),

                    new StringSelectMenuOptionBuilder()
                        .setLabel(`Roll`)
                        .setEmoji(shop_emojis["roll"])
                        .setValue("Roll"),

                ])
            const row = new ActionRowBuilder().addComponents(
                elements
            );
            const close = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`close`)
                    .setLabel(`X`)
                    .setStyle(ButtonStyle.Danger),
            );
            if (!args[0]) {
                return message.channel.send({ embeds: [Shop], components: [row, close] })
            }

            let filter = msg.user.id === message.author.id && message.inSelectMenu();
            let colector = message.channel.createMessageComponentCollector({ filter: filter, time: 10000 });

            let wallet = db.get("wallet." + message.author.id);

            colector.on("collect", (c) => {
                // c.deferUpdate(); 

                if (values === "food") {

                    if (wallet < 10000) {
                        message.channel.send(`You don't have \`1000 coins\` to buy food. Use \`${prefix}shop\`)`);
                    } else {
                        message.channel.send(`You bought \`1000 coins\` to buy food. Use \`${prefix}shop\`)`);
                        db.add(`wallet.${message.author.id}`, 1)
                    }
                }

                if (values === "cloth") {

                    if (wallet < 5000) {
                        message.channel.send(`You don't have \`5000 coins\` to buy clothes. Use \`${prefix}shop\`)`);
                    } else {
                        message.channel.send(`You bought \`5000 coins\` to buy clothes. Use \`${prefix}shop\`)`);
                        db.add(`wallet.${message.author.id}`, 1)
                    }
                }

                if (values === "device") {

                    if (wallet < 6000) {
                        message.channel.send(`You don't have \`6000 coins\` to buy digital devices. Use \`${prefix}shop\`)`);
                    } else {
                        message.channel.send(`You bought \`6000 coins\` to buy digital devices. Use \`${prefix}shop\`)`);
                        db.add(`wallet.${message.author.id}`, 1)
                    }
                }

            })

        } catch (e) {
            const Error = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(
                    `**Error al ejecutar el comando** \`/${this.data.name}\`\n\n` +
                    `**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
                    `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
                )
            message.channel.send({ embeds: [Error] });
        } finally {
            console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando ${prefix}${this.name} en el servidor ${message.guild.name}`);
        }
    },
}
