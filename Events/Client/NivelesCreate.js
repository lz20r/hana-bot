const config2 = require("../../Schemas/configlvl");

module.exports =  {
  name: "interactionCreate",
  async execute(client, guild) {
	  
    let data = await config2.findOne({ GuildId: guild.id, activado: false });
 
    if (!data) {
      let newdata = new config2({
        GuildId: guild.id,
        activado: false,
      });

      await newdata.save();
    }
	
  }}
