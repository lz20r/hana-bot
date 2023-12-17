const { EmbedBuilder } = require("discord.js");
const client = require("../../index");
const cooldowns = new Map();



// Debes implementar esta función para parsear la duración desde el argumento
function parseDuration(durationArg) {
  const timeRegex = /^(\d+)([hms])$/; // Expresión regular para duración en formato 1h, 30m, etc.

  // Verificar si durationArg cumple con el patrón antes de llamar a match
  if (timeRegex.test(durationArg)) {
    const match = durationArg.match(timeRegex);
    // Realizar operaciones con 'match' aquí

    // if (!match) return null;

    const amount = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case "h":
        return amount * 60 * 60 * 1000; // Horas a milisegundos
      case "m":
        return amount * 60 * 1000; // Minutos a milisegundos
      case "s":
        return amount * 1000; // Segundos a milisegundos
      default:
        return null;
    }
  } else {
    // Manejar el caso en el que durationArg no cumple con el patrón
    console.error("The duration does not comply with the expected format.");
  }
}

// Función para formatear la duración en formato legible
function formatDuration(duration) {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  return `${hours > 0 ? hours + "h" : ""} ${minutes > 0 ? minutes + "m" : ""
    } ${seconds}s`;
}

module.exports = {
  name: "giveaway",
  description: "Create a giveaway",
  category: "Mod",
  alias: [
    "giveaway", "Giveaways", "Giveaway", "giveaways", "GIVEAWAY", "GIVEAWAYS",
    "sorteo", "Sorteo", "SORTEO", "sorteos", "Sorteos", "SORTEOS",
    "景品", "ギブアウェイ", "ギブアウェイ"
  ],

  async execute(message, args, client) {
    try {
      const server = message.guild.id;
      const prefix = await db.get("prefix." + server)
      const developerId1 = "1033160523044376616"; // Reemplaza con tu Developer ID
      const developerId2 = "773734330493042699"; // Reemplaza con tu Developer ID
      const allowedChannelId = "1150850711849021520"; // Reemplaza con el ID del canal de sorteos

      if (
        message.author.id !== developerId1 &&
        message.author.id !== developerId2
      ) {
        return message.reply(
          "This command can only be used by the developer."
        );
      }
      if (message.channel.id !== allowedChannelId) {
        return message.reply(
          "This command can only be used in the giveaway channel."
        );
      }

      const title = args[0];
      const prizeAmount = parseInt(args[1]);
      const duration = parseDuration(args[2]); // Debes implementar la función para parsear la duración

      if (!title || isNaN(prizeAmount) || !duration) {
        return message.reply(
          "Incorrect use. Please provide the title, prize amount and valid duration."
        );
      }

      // Puedes adaptar esta parte para manejar la participación de usuarios

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setAuthor({
          name: "Naiara Developer",
          iconURL: "https://i.imgur.com/kuU7NcU.jpg",
        })
        .setTitle(`¡Giveaway: ${title}!`)
        .setDescription(
          `¡Participate in this exciting giveaway for **$${prizeAmount.toLocaleString()}**!\n\nReact with 🎉 to enter.\n\nDuration: ${formatDuration(
            duration
          )}.`
        )
        .setFooter({
          text: "Marce Developer",
          iconURL: "https://i.imgur.com/kuU7NcU.jpg",
        });

      const giveawayMessage = await message.channel.send({ embeds: [embed] });
      await giveawayMessage.react("🎉");

      // Eliminar el mensaje del comando
      message.delete();

      setTimeout(async () => {
        const giveawayMessageFetched = await giveawayMessage.fetch();
        const reactions = giveawayMessageFetched.reactions.cache.get("🎉");
        const participants = Array.from(
          (await reactions.users.fetch()).values()
        ).filter((user) => !user.bot);

        if (participants.length === 0) {
          return message.channel.send(
            "El sorteo ha terminado, pero no hubo participantes."
          );
        }

        const winners = [];
        const numberOfWinners = 1; // Número de ganadores
        for (let i = 0; i < numberOfWinners; i++) {
          const randomIndex = Math.floor(Math.random() * participants.length);
          winners.push(participants.splice(randomIndex, 1)[0]);
        }

        const winnersList = winners.map((user) => user.toString()).join(", ");

        const winnersEmbed = new EmbedBuilder()
          .setColor("#3498db")
          .setAuthor({
            name: "Administration",
            iconURL: "https://i.imgur.com/kuU7NcU.jpg",
          })
          .setTitle(`¡Sorteo: ${title}!`)
          .setDescription(
            `🎉 ¡The giveaway is over! Congratulations to the winners!\n\nWinners: ${winnersList}\nPremio: **$${prizeAmount.toLocaleString()}**`
          )
          .setFooter({
            text: "Bet responsibly +18 | Ushuaia Casino",
            iconURL: "https://i.imgur.com/kuU7NcU.jpg",
          });

        message.channel.send({ embeds: [winnersEmbed] });

        // Puedes implementar la entrega de premios aquí
      }, duration)
    } catch (error) {
      const Error = new EmbedBuilder()
        .setColor(0xFF0000)
        .setDescription(
          `**Error al ejecutar el comando**\n- \`\`\`${prefix}${this.name}\`\`\`\n\n` +
          `**ErrMessage:**\n - \`\`\`${e.message}\`\`\`\n` +
          `**Stacktrace:**\n - \`\`\`${e.stack}\`\`\`\n`
        )
      message.channel.send({ embeds: [Error] }).then((msg) => {
        setTimeout(() => {
          msg.delete
        })
      })
    } finally {
      console.log(`\n💭  [CMD] ${message.author.globalName} [${message.author.tag}] ha usado el comando /giveaway en el servidor ${message.guild.name}`)
    }
  }
}

