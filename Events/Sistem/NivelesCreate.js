const client = require("../../index");

client.on("guildCreate", async(guild) => {
	  
    let data = await config2.findOne({ GuildId: guild.id, activado: false });

    if (!data) {
      let newdata = new config2({
        GuildId: guild.id,
        activado: false,
      });

      await newdata.save();
    }
	
  })
