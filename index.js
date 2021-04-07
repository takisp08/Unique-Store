const Discord = require('discord.js')
const client  = new Discord.Client()
Discord.Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;
const enmap = require('enmap');
const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')
const leave = require('./leave')
const poll = require('./poll');
const {MessageEmbed} = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment');
const guildInvites = new Map();
const FiveM = require('fivem')
const staffids = '498118948370382848' 
const jointocreate = require('./jointocreate')
const jointocreate2 = require('./jointocreate2')
const onduty = "824758221142884442" 
const svr = new FiveM.Server(`${config.ip}:${config.port}`);
prefix =  '!'
const settings = new enmap({
  name: "settings",
  autoFetch: true,
  cloneLevel: "deep",
  fetchAll: true
});



client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
          client.user.setActivity("𝐔𝐧𝐢𝐪𝐮𝐞 𝐒𝐭𝐨𝐫𝐞")
   
  })
});


client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command == "ticket-setup") {
     

      let channel = message.mentions.channels.first();
      if(!channel) return message.reply("Usage: `!ticket-setup #channel`");

      let sent = await channel.send(new Discord.MessageEmbed()
          
          .setColor('#a103fc')
          .setThumbnail('https://cdn.discordapp.com/attachments/827519016120614914/829310983872446464/uniquestore.gif')
          .setDescription(`  
             > **Αν θέλετε να αναφέρετε ένα γεγονός , αντιδρώντας στα emoji μπορείτε να ανοίξετε ένα ticket!**
           **🔍 \`Questions\`**
          
           **🔧 \`Script Support\` **
          
           **💰 \`Buy\`**

           **🤝 \`Partner\`**

         
          
         
          
          
          
              
              `)
        
       
      );

     
      sent.react('🔍');
      sent.react('🔧');
      sent.react('💰');
      sent.react('🤝');
   
      settings.set(`${message.guild.id}-ticket`, sent.id);

      message.channel.send("`✔`")
  }

  if(command == "close") {
      if(!message.channel.name.includes("ticket-")) return message.channel.send("**Δεν μπορεις να το κλείσεις.**")
      message.channel.delete();
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();

  if(user.bot) return;

  let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

  if(!ticketid) return;

  if(reaction.message.id == ticketid && reaction.emoji.name == '🔍') {
      reaction.users.remove(user);

      reaction.message.guild.channels.create(`🔍ticket-${user.username}`, {
          permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              },
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              }
          ],
          type: 'text',
          parent: "829325762569568276", //or set it as a category id
      }).then(async channel => {
          channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setDescription("```Παρακαλώ περιμένετε μέχρι κάποιος να σας εξυπηρετήσει.Αν θέλετε να κλείσετε το ticket γράψτε **!close**.```").setColor('#a103fc'))
         
      })
  }
  
  if(reaction.message.id == ticketid && reaction.emoji.name == '🔧') {
      reaction.users.remove(user);

      reaction.message.guild.channels.create(`🔧ticket-${user.username}`, {
          permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              },
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              }
          ],
          type: 'text',
          parent: "829325762569568276", //or set it as a category id
      }).then(async channel => {
        channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setDescription("```Παρακαλώ περιμένετε μέχρι κάποιος να σας εξυπηρετήσει.Αν θέλετε να κλείσετε το ticket γράψτε **!close**.```").setColor('#a103fc'))
      })
  }
  if(reaction.message.id == ticketid && reaction.emoji.name == '💰') {
      reaction.users.remove(user);

      reaction.message.guild.channels.create(`💰ticket-${user.username}`, {
          permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              },
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              }
          ],
          type: 'text',
          parent: "829325762569568276", //or set it as a category id
      }).then(async channel => {
        channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setDescription("```Παρακαλώ περιμένετε μέχρι κάποιος να σας εξυπηρετήσει.Αν θέλετε να κλείσετε το ticket γράψτε **!close**.```").setColor('#a103fc'))
      })
  }
  if(reaction.message.id == ticketid && reaction.emoji.name == '🤝') {
    reaction.users.remove(user);

    reaction.message.guild.channels.create(`🤝ticket-${user.username}`, {
        permissionOverwrites: [
            {
                id: user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            },
            {
                id: reaction.message.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
            }
        ],
        type: 'text',
        parent: "829325762569568276", //or set it as a category id
    }).then(async channel => {
      channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setDescription("```Παρακαλώ περιμένετε μέχρι κάποιος να σας εξυπηρετήσει.Αν θέλετε να κλείσετε το ticket γράψτε **!close**.```").setColor('#a103fc'))
    })
}



});


jointocreate(client)
jointocreate2(client)
welcome(client)
leave(client)

client.login(config.token)