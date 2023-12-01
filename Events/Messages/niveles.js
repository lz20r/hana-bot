const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const levels = require("../../Schemas/niveles");
const clvl = require("../../Schemas/canallvl");
const config2 = require('../../Schemas/configlvl');
const client = require("../../index")

client.on("messageCreate", async(message)=> {
	
    if (message.author.bot) return;
      
  const data2 = await config2.findOne({ GuildId: message.guild.id });
  const cndata = await clvl.findOne({ Guild: message.guild.id });
  if(!cndata) return;
    
  if(data2.activado === false) return;
	//activar o desactivar

    const data = await levels.findOne({
      guildId: message.guild.id,
      userId: message.author.id
    });


    let randomxp = Math.floor(Math.random() * 30);

    if (message.content.length < 4) return;

    if (!data) {
      await levels.create({
        guildId: message.guild.id,
        userId: message.author.id,
        xp: randomxp
      });
    }

    const xpTotal = data.xp + randomxp;

    if (xpTotal >= data.limit) {
        
       let canal = await cndata.Channel;
       if(client.channels.cache.get(await canal)){
        client.channels.cache.get(await canal)
          .send(`<@${message.author.id}> Felicitaciones subiste a nivel ${data.level + 1}`);
    } else {
        message.channel.send({
            content: `${message.author.username} Felicitaciones subiste a nivel ${data.level + 1}`});
}
   
       
      if (data.level + 1 === 1) {
          
      } else if(data.level + 1 === 5){
        
      }

      return levels.findOneAndUpdate(
        { guildId: message.guild.id, userId: message.author.id },
        {
          xp: xpTotal,
          level: data.level + 1,
          limit: data.limite + 100,
        }
      );
    }

    await levels.findOneAndUpdate(
      { guildId: message.guild.id, userId: message.author.id },
      {
        xp: xpTotal,
      }
    );
  });