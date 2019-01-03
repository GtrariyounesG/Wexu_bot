const Discord = require('discord.js');
const tpoints = {};
const vpoints = {};
const jimp = require("jimp");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity("BETAAA",{type: 'watching'})
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});


client.on("guildCreate", guild => {
console.log(` Canon Bot  Added To Server ${guild.name} , The Owner Is ${guild.owner.user.username} , Members In Server : **[${guild.memberCount}]**            `)
client.channels.get("399697177259147275").send('** :purple_heart: Canon Bot ** ``Added``:white_check_mark:  To Server '+`** [ ${guild.name} ] **`+''+'  The Owner Is  ' +`**[ ${guild.owner.user.username} ]** , Members In Server : **[${guild.memberCount}]**` +'')
});

client.on("guildDelete", guild => {
console.log(` Canon Bot  Leave From Server ${guild.name}, The Server Owner Is ${guild.owner.user.username}`)
client.channels.get("399697177259147275").send('** :purple_heart: Canon Bot  **``Kicked``:x:  From Server '+`** [ ${guild.name} ] **`+''+' The Owner Is ' +`**[ ${guild.owner.user.username} ]**` +'')
  });


client.on('message',async message => {
    var p = "?"
  function timeCon(time) {
  let days = Math.floor(time % 31536000 / 86400)
  let hours = Math.floor(time % 31536000 % 86400 / 3600)
  let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60)
  let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60)
  days = days > 9 ? days : '0' + days
  hours = hours > 9 ? hours : '0' + hours
  minutes = minutes > 9 ? minutes : '0' + minutes
  seconds = seconds > 9 ? seconds : '0' + seconds
  return `${days > 0 ? `${days}:` : ''}${(hours || days) > 0 ? `${hours}:` : ''}${minutes}:${seconds}`
  };
  if(message.content.startsWith( p + "bot-info")) {
    const millis = new Date().getTime() - client.user.createdAt.getTime();
    const noww = new Date();
    dateFormat(noww, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    const createdAT = millis / 1000 / 60 / 60 / 24;
    var star = new Discord.RichEmbed() 
    .setTitle(`Information of ${client.user.username} `)
    .setColor('#36393e')
    .addField('💓 Prefix', prefix, true)
    .addField('🖥️ Memory Usage', `${(process.memoryUsage().rss / 1048576).toFixed()} MB.`,true)
    .addField('🏍️ Ping', `${Math.round(client.ping)} ms.`,true)
    .addField('⏲️ Uptime', `${timeCon(process.uptime())}`, true)
    .addField('💚 Servers', client.guilds.size,true)
    .addField('💙 Users', client.users.size,true)
    message.channel.send(star);
  }
});





client.on("message", message => {
 if (message.content === "?invite") {
  const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setFooter('© Canon Bot :heart: 2018-2019 ')
      .addField('Thanks you for using Canon Bot', `https://modest-lewin-146a75.netlify.com`)
  message.author.send({embed});

 }
}); 





client.on('message', message => {
const prefix = "?";
  if (message.author.zaid) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Dont have permissions.**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  
  if (message.mentions.users.size < 1) return message.reply("**Mention the member.**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**The Bot Role must be above the given player role.**");


  message.guild.member(user).ban(7, user);

message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `)

}
});


client.on('message', message => {
const prefix = "?";
  if (message.author.zaid) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return;
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");

  if (message.mentions.users.size < 1) return message.reply("type the user to kick");
  if(!reason) return message.reply (":x: Type the Reason !");
  if (!message.guild.member(user)
  .bannable) return message.reply("I can not kick who are above me :(");

  message.guild.member(user).kick(7, user);

  const banembed = new Discord.RichEmbed()
  .setAuthor('Kicked !', user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("User:",  `[ + ${user.tag} + ]`)
  .addField("By:", `[  + ${message.author.tag} +  ]`)
  .addField("Reason:", `[ + ${reason} +  ]`)
  client.channels.get("492086928397565952").send({embed : banembed})
}
});


client.on('message', async message => {
  let args = message.content.split(" ");
  if(message.content.startsWith(prefix + "mute")) {
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    let mention = message.mentions.members.first();//kinggamer حقوق الفا كودز و
    if(!mention) return  message.channel.send('').then(msg => { //kinggamer حقوق الفا كودز و
      msg.delete(3500);
      message.delete(3500);
    });
 
    if(mention.id === message.author.id) return message.channel.send('**You Cannot give mute to your self :x:**').then(msg => {
      msg.delete(3500);
      message.delete(3500); //kinggamer حقوق الفا كودز و
    });
   
    if(mention.hasPermission('ADMINISTRATOR')) return message.channel.send(`**You can't give mute for a staff member. :x:**`); //kinggamer حقوق الفا كودز و
 
    if(message.guild.member(mention).roles.find('name', 'Muted')) return message.channel.send(`**:information_source: ${mention.user.username} Already Muted**`);
 
   
    if(mention.position >= message.guild.member(message.author).positon) return message.channel.send('You Donot Have Permission **Muted_Members** ').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
   
    if(mention.positon >= message.guild.member(client.user).positon) return message.channel.send('I Donot Have Permission **Muted_Members**').then(msg => {
      msg.delete(3500);
      message.delete(3500); //kinggamer حقوق الفا كودز و
    });
   
    let duration = args[2];
    if(!duration) message.channel.send(`**:hash: You Can Use ${prefix}mute @user Time Reason**`).then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    if(isNaN(duration))  message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500);
    });
 
    let reason = message.content.split(" ").slice(3).join(" ");
    if(!reason) reason = " [ **No Reason.** ] ";
 
    let thisEmbed = new Discord.RichEmbed()
    .setAuthor(mention.user.username, mention.user.avatarURL)
    .setTitle('**You Have been Muted !!**')
    .addField('**Server**',[ message.guild.name ]) //kinggamer حقوق الفا كودز و
    .addField('**BY:**', [ message.author ])
    .addField('**Reason:**',reason)
    .addField('**Time:**',duration)
 
    let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!role) try {
      message.guild.createRole({
        name: "Muted",
        permissions: 0 //kinggamer حقوق الفا كودز و
      }).then(r => {
        message.guild.channels.forEach(c => {
          c.overwritePermissions(r , {
            SEND_MESSAGES: false, //kinggamer حقوق الفا كودز و
            READ_MESSAGES_HISTORY: false,
            ADD_REACTIONS: false
          });
        });
      }); //kinggamer حقوق الفا كودز و
    } catch(e) {
      console.log(e.stack);
    }
    mention.addRole(role).then(() => {
      mention.send(thisEmbed);
      message.channel.send(`**:white_check_mark: ${mention.user.username}  Muted! :zipper_mouth:  **  `);
      mention.setMute(true); //kinggamer حقوق الفا كودز و
    });
    setTimeout(() => {
      if(duration === 0) return;
      mention.setMute(false);
      mention.removeRole(role)
    },duration * 60000); //kinggamer حقوق الفا كودز و
  }
});


client.on('message', async message => {
    let mention = message.mentions.members.first();
let command = message.content.split(" ")[0];
     command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);  //kinggamer حقوق الفا كودز و
if(command === `unmute`) {2
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**You Donot HavePermission Mute_Members**").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I donot Have Permission Mute_Members**").then(msg => msg.delete(6000))
 
  let kinggamer = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
     if(!kinggamer) return message.channel.send('').then(msg => {
      msg.delete(3500);
      message.delete(3500); //kinggamer حقوق الفا كودز و
    });
 
  let role = message.guild.roles.find (r => r.name === "Muted");
 
  if(!role || !kinggamer.roles.has(role.id)) return message.channel.sendMessage(`**:information_source:${mention.user.username} لقد تم فك الميوت عنه مسبقا**`)
 
  await kinggamer.removeRole(role) //kinggamer حقوق الفا كودز و
  message.channel.sendMessage(`**:white_check_mark: ${mention.user.username}  Unmuted! **`);
 
  return;
 
  }
 
});


var prefix = "?"

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
    if (command === "banlist") {
        message.delete(5000)
         if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.reply("Error : \` I Dont Have ADMINISTRATOR Permission\`").then(message => message.delete(5000));
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        if(!message.channel.guild) return;
        message.guild.fetchBans()
        .then(bans => message.channel.send(`\`${bans.size}\` ***: Server Ban List ***`)).then(message => message.delete(5000))

  .catch(console.error);
}
});



 client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='?count')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle(':rose:| **Members Count !**')
      .addBlankField(true)
      .addField('Count :',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });

	
client.on('message', message => {

    if(message.content === prefix + "?mc") {
                        if(!message.channel.guild) return message.reply('** This command only for servers**');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__You dont have Permission__**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("**Chat Locked ! ✅ **")
           });
             }

 if(message.content === prefix + "?umc") {
                     if(!message.channel.guild) return message.reply('** This command only for servers**');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__You dont have Permission__**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("**Chat unLocked !**")
           });
             }
             
      
    
});


      client.on('message', message => {
        if (message.content === "?inv") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setAuthor(`Canon Bot©`, message.author.avatarURL)      
        .setTitle(`:small_orange_diamond: Click Here.. !`)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=493764393016754178&scope=bot&permissions=2146958591`)
        .setThumbnail(" https://cdn.discordapp.com/avatars/377904849783750667/6c76e412f18c142dfd711d05fb363869.png?size=2048")
        .addField(':small_blue_diamond: Requested By:', "<@" + message.author.id + ">")        
     message.channel.sendEmbed(embed);
       }
   });
   
   
   
 client.on('message', message => {
     if (message.content === "?ping") {
      const embed = new Discord.RichEmbed()
 
  .setColor("#FF0000")
  .addField('Bot Ping is' , `${Date.now() - message.createdTimestamp}` + ' ms`')
 
  message.channel.sendEmbed(embed);
    }
});


client.on('message', message => {
    if (message.content.startsWith("?avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;
         
      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});



client.on('message', message => {
    if(message.content.includes('discord.gg')){
                                            if(!message.channel.guild) return message.reply('**..**');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete(3000)
    return message.reply(`**🔗 Don't Try to share servers ! 🔗**`)
    }
}
});  


client.on('message', message => {
const args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('?bcall')){
 if(!message.author.id === '399697177259147275') return;
message.channel.sendMessage(':white_check_mark: Sending The BC')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
})




client.on('message',async msg => {
     if(msg.channel.type === "old") return;
  if(msg.author.bot) return;
  var p = "?";
  if(msg.content.startsWith(p + "setstats")) {
  if(!msg.guild.member(msg.author).hasPermissions('MANAGE_CHANNELS')) return msg.reply('? **لا معك رتبه**');
  if(!msg.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return msg.reply('? **البوت لا يمتلك صلاحية**');
  var ggg= msg.guild.createChannel('Server Stats', 'category').then(kk => {
           var ccc =msg.guild.createChannel('Voice O', 'voice').then(al => {
                var aa =msg.guild.createChannel('TIME ', 'voice').then(alp => {
                   var aaa =msg.guild.createChannel('DATE ', 'voice').then(alph => {
       al.setParent(kk);
       alp.setParent(kk);
       alph.setParent(kk);
       
     al.overwritePermissions(msg.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
     alp.overwritePermissions(msg.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
     alph.overwritePermissions(msg.guild.id, {
      CONNECT: false,
      SPEAK: false
    });

  setInterval(() => {
      var currentTime = new Date(),
hours = currentTime.getHours() + 2 ,
minutes = currentTime.getMinutes(),
Seconds = currentTime.getSeconds(),
Year = currentTime.getFullYear(),
Month = currentTime.getMonth() + 1,
Dat = currentTime.getDate()
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
     al.setName(`Voice Online :[ ${msg.guild.members.filter(m => m.voiceChannel).size} ]`);
      alp.setName(`Time :[${hours} : ${minutes} : ${Seconds} ${suffix}]`);
        alph.setName(` Date : [${Dat} - ${Month} - ${Year}]`);
 },1000);
                   })
    
                })
           })
  })
           
  }
 
});


client.on('message', async message => {
    if(message.content.includes('discord.gg')){ 
        if(message.member.hasPermission("MANAGE_GUILD")) return;
if(!message.channel.guild) return;
message.delete()
  var command = message.content.split(" ")[0];
let muterole = message.guild.roles.find(`name`, "Muted");
if(!muterole){
try{
muterole = await message.guild.createRole({
  name: "Muted",
  color: "#000000",
  permissions:[]
})
message.guild.channels.forEach(async (channel, id) => {
  await channel.overwritePermissions(muterole, {
    SEND_MESSAGES: false,
    ADD_REACTIONS: false
  });
});
}catch(e){
console.log(e.stack);
}
}
   if(!message.channel.guild) return message.reply('** This command only for servers**');
message.member.addRole(muterole);
const embed500 = new Discord.RichEmbed()
.setTitle("Muted Ads")
    .addField(`**  You Have Been Muted **` , `**Reason : Sharing Another Discord Link**`)
    .setColor("c91616")
    .setThumbnail(`${message.author.avatarURL}`)
    .setAuthor(message.author.username, message.author.avatarURL)
.setFooter(`${message.guild.name} `)
message.channel.send(embed500)


}
})




///--------------------------------------------------------------------------------------------------------------


client.on('message', message => {
    if (message.author.id === client.user.id) return;
if(!message.channel.guild) return
   let embed = new Discord.RichEmbed()
    let args = message.content.split(' ').slice(1).join(' ');
if(message.content.startsWith( '?' + 'bc')) {
        message.guild.members.forEach(member => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return;
            member.send(`${member} ** ${args}** `);

        });
    }

});








////set

client.login(process.env.BOT_TOKEN);

