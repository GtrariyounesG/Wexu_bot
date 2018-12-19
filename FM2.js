const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "$" ; // البرفكس
const fs = require('fs');
const moment = require('moment');
const jimp = require('jimp');
const Canvas = require('canvas');




client.on('ready',  () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); 
  console.log('                          Bot By : ImD3s_x');
  console.log('                          Bot is Ready <3');  
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('By : ImD3s_x ');
  console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
  console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
  console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');  
  console.log('is online')
client.user.setStatus("dnd");
});





client.on('message', async message => { 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
 
    var prefix = '$'; 
    var args = message.content.toLowerCase().split(" "); 
    var command = args[0];
 
  if(command == prefix + 'bc') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: | You dont have **ADMINISTRATOR** Permission!'); // Alpha Codes Server.
        if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
       
        let bcCommand = new Discord.RichEmbed()
        .setTitle(':white_check_mark: **BroadCast Command.**')
        .setColor('GREEN')
        .setDescription(`**\n${prefix}bc <MESSAGE>**\n➥ \`\`Send for all members the message.\`\`\n\n**${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\`\n\n**${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\`\n\n**${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL)
       
        if(!args[1]) return message.channel.send(bcCommand); 
       
        var getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[1]));
       
        if(args[1] === 'admins' || args[1] === 'members' || getRole) {
            var argsM = message.content.split(' ').slice(2).join(' ');
        }else if(args[1] !== 'admins' || args[1] !== 'members' || !getRole) { 
            var argsM = message.content.split(' ').slice(1).join(' ');
        }
       
        if(args[1] === 'admins' || args[1] === 'members') {
            if(args[1] === 'admins') {
                var admin = message.guild.members.filter(m => m.hasPermission('ADMINISTRATOR') && !m.user.bot);
                if(admin.size <= 1) return message.channel.send(':no_entry: | No admins in this server!');
               
                let notArgsM = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
                .setColor('GREEN')
                .setDescription(`**\n${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL) 
				
                if(!argsM) return message.channel.send(notArgsM);
               
                let adminMsg = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
                .setColor('GREEN')
                .setDescription(`**\n**:red_circle: Are you sure to send the message to **${admin.size}** Admins?\n\n**➥ Message:**\n${argsM}`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL) 
               
                message.channel.send(adminMsg).then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                   
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                    send.on('collect', r => {
                        msgB.delete();
                        message.channel.send(`:timer: | Wait some time to send the message to **${admin.size}** Admins ...`).then(msg => {
                            admin.forEach(async a => { 
                                let bcMessage = new Discord.RichEmbed()
                                .setTitle(`:loudspeaker: ${a.user.username}`)
                                .setColor('GREEN')
                                .addField(':pencil: **Sender:**', message.author.username, true)
                                .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                                .addField(':scroll: **Message:**', argsM.replace('[user]', a))
                                .setTimestamp()
                                .setFooter(message.author.tag, message.author.avatarURL)
                               
                                a.send(bcMessage)
                                await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${admin.size}** Admins!`);
                            })
                        })
                    })
                    dontSend.on('collect', r => {
                        msgB.delete(); 
                        message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                    })
                })
            }else if(args[1] === 'members') {
                var member = message.guild.members.filter(m => !m.hasPermission('ADMINISTRATOR') && !m.user.bot);
                if(member.size === 0) return message.channel.send(':no_entry: | No members in this server!');
               
                let notArgsM = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
                .setColor('GREEN')
                .setDescription(`**\n${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
                .setTimestamp() 
                .setFooter(message.author.tag, message.author.avatarURL)
               
                if(!argsM) return message.channel.send(notArgsM);
               
                let memberMsg = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
                .setColor('GREEN')
                .setDescription(`**\n**:red_circle: Are you sure to send the message to **${member.size}** Members?\n\n**➥ Message:**\n${argsM}`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL)
               
                message.channel.send(memberMsg).then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                    // Alpha Codes Server.
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                    send.on('collect', r => {
                        msgB.delete();
                        message.channel.send(`:timer: | Wait some time to send the message to **${member.size}** Members ...`).then(msg => {
                            member.forEach(async m => {
                                let bcMessage = new Discord.RichEmbed()
                                .setTitle(`:loudspeaker: ${m.user.username}`)
                                .setColor('GREEN')
                                .addField(':pencil: **Sender:**', message.author.username, true)
                                .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                                .addField(':scroll: **Message:**', argsM.replace('[user]', m))
                                .setTimestamp()
                                .setFooter(message.author.tag, message.author.avatarURL)
                               
                                m.send(bcMessage) 
                                await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${member.size}** Members!`);
                            })
                        })
                    })
                    dontSend.on('collect', r => {
                        msgB.delete();
                        message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                    })
                }) 
            }
        }else if(getRole) {
            var membersRole = message.guild.members.filter(m => m.roles.has(getRole.id) && !m.user.bot);
            if(membersRole.size === 0) return message.channel.send(`:no_entry: | No members have **${getRole.name}** Role!`);
           
            let notArgsM = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
            .setColor('GREEN')
            .setDescription(`**\n${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\``)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL) 
           
            if(!argsM) return message.channel.send(notArgsM);
           
            let membersRoleMsg = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
            .setColor('GREEN')
            .setDescription(`**\n**:red_circle: Are you sure to send the message to **${membersRole.size}** Members?\n\n**➥ Message:**\n${argsM}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL)
           
            message.channel.send(membersRoleMsg).then(msgB => {
                msgB.react('✅').then(() => msgB.react('❎')) 
               
                let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let send = msgB.createReactionCollector(sendR);
                let dontSend = msgB.createReactionCollector(dontSendR);
               
                send.on('collect', r => {
                    msgB.delete(); 
                    message.channel.send(`:timer: | Wait some time to send the message to **${membersRole.size}** Members ...`).then(msg => {
                        membersRole.forEach(async mR => {
                            let bcMessage = new Discord.RichEmbed()
                            .setTitle(`:loudspeaker: ${mR.user.username}`)
                            .setColor('GREEN')
                            .addField(':pencil: **Sender:**', message.author.username, true)
                            .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                            .addField(':scroll: **Message:**', argsM.replace('[user]', mR))
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.avatarURL)
                           
                            mR.send(bcMessage)
                            await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${membersRole.size}** Members!`); // Alpha Codes Server.
                        })
                    })
                })
                dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
        }else if(args[1] !== 'admins' && args[1] !== 'members' && !getRole) {
            var allB = message.guild.members.filter(m => !m.user.bot);
            if(allB.size === 1) return message.channel.send(`:no_entry: | No members in this server!`);
           
            let allMsg = new Discord.RichEmbed() 
            .setTitle(`:white_check_mark: **BroadCast Command.** (ALL)`)
            .setColor('GREEN')
            .setDescription(`**\n**:red_circle: Are you sure to send the message to **${allB.size}** Members?\n\n**➥ Message:**\n${argsM}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL) 
           
            message.channel.send(allMsg).then(msgB => {
                msgB.react('✅').then(() => msgB.react('❎'))
               
                let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let send = msgB.createReactionCollector(sendR);
                let dontSend = msgB.createReactionCollector(dontSendR); 
               
                send.on('collect', r => {
                    msgB.delete();
                    message.channel.send(`:timer: | Wait some time to send the message to **${allB.size}** Members ...`).then(msg => {
                        allB.forEach(async m => {
                            let bcMessage = new Discord.RichEmbed()
                            .setTitle(`:loudspeaker: ${m.user.username}`) 
                            .setColor('GREEN')
                            .addField(':pencil: **Sender:**', message.author.username, true)
                            .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                            .addField(':scroll: **Message:**', argsM.replace('[user]', m))
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.avatarURL)
                           
                            m.send(bcMessage)
                            await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${allB.size}** Members!`);
                        })
                    })
                })
                dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
        }
    }
});




client.on('message', message => {

var prefix = "$";

       if(message.content === prefix + "mc") {

                           if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');

              message.channel.overwritePermissions(message.guild.id, {

            SEND_MESSAGES: false

              }).then(() => {

                  message.reply("**__تم تقفيل الشات__ ✅ **")

              });

                }

    if(message.content === prefix + "umc") {

                        if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ليس لديك صلاحيات__**');

              message.channel.overwritePermissions(message.guild.id, {

            SEND_MESSAGES: true

                

              }).then(() => {

                  message.reply("**__تم فتح الشات__✅**")

              });

    }

       

});

client.on('message', message => {
        if(message.content === prefix + "hide") {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Dont Have Perms ❌');
               message.channel.overwritePermissions(message.guild.id, {
               READ_MESSAGES: false
   })
                message.channel.send('Channel Hided Successfully ! ✅  ')
   }
  });

/// !show 
  
client.on('message', message => {
        if(message.content === prefix + "show") {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('❌');
               message.channel.overwritePermissions(message.guild.id, {
               READ_MESSAGES: true
   })
                message.channel.send('Channel Showen Successfully ! ✅  ')
   }
  });
  
  
  
  
  
  
  
  
  
client.on('message', message => {
    if (message.content.startsWith("$bans")) {
        message.guild.fetchBans()
        .then(bans => message.channel.send(`${bans.size} عدد اشخاص المبندة من السيرفر `))
  .catch(console.error);
}
}); 


	
	
 client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='$count')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle(':tulip:| Members info')
      .addBlankField(true)
      .addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });


client.on("message", message => {
              var args = message.content.substring(prefix.length).split(" ");
              if (message.content.startsWith(prefix + "clear")) {
                  if(!message.channel.guild) return message.reply('**❌ اسف لكن هذا الامر للسيرفرات فقط **');         
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**⚠  لا يوجد لديك صلاحية لمسح الشات**');
          var msg;
          msg = parseInt();
        
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        message.channel.sendMessage("", {embed: {
          title: "``تــم مسح الشات ``",
          color: 0x06DF00,
          footer: {
            
          }
        }}).then(msg => {msg.delete(3000)});
                            }
  
       
  });



  
	
 const devs = ['399697177259147275' , '340169953200308225' , '500662619267399698'];
const adminprefix = "-";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/ImD3s_x");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }
  });




 client.on('message', message => {
    if(!message.channel.guild) return;
if (message.content.startsWith('$ping')) {
if(!message.channel.guild) return;
var msg = `${Date.now() - message.createdTimestamp}`
var api = `${Math.round(client.ping)}`
if (message.author.bot) return;
let embed = new Discord.RichEmbed()
.setAuthor(message.author.username,message.author.avatarURL)
.setColor('RANDOM')
.addField('**Time Taken:**',msg + " ms 📶 ")
.addField('**Discord API:**',api + " ms 📶 ")
message.channel.send({embed:embed});
}
});





client.login(process.env.OBX);
