const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildsMembers, GuildsMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

class HanaClient extends Client {
    constructor() {
        super({
            intents: [3276799],
            GatewayIntentBits: [Guilds, GuildsMembers, GuildsMessages],
	        partials: [User, Message, GuildMember, ThreadMember],
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: true,
            },
        })
    }
}

module.exports = HanaClient;
