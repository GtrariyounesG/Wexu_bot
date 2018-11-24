const Discord = require('discord.js');
const moment = require("moment");
const fs = require("fs");
const client = new Discord.Client();
const prefix = "-"



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
  console.log('                Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`-help-m | Moderation`,'https://www.twitch.tv/ImD3s_x');	
});  

client.on ("guildMemberAdd", member => {
  
   var role = member.guild.roles.find ("name", "✽ 𝘎𝘢𝘮𝘦𝘳");
   member.addRole (role);
  
})

client.on ("guildMemberAdd", member => {
  
   var role = member.guild.roles.find ("name", "✔𝘎𝘢𝘮𝘦𝘳✔");
   member.addRole (role);
  
})

client.on ("guildMemberAdd", member => {
  
   var role = member.guild.roles.find ("name", "✽ Member");
   member.addRole (role);
  
})


client.on('message', message => {

	//xRGRx .. By Julian

	if (message.author.bot) return;

	var command = message.content.toLowerCase().split(" ")[0];

	var args = message.content.toLowerCase().split(" ");

if(null == message.guild || !message.guild) return;

	var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id === args[1]));

	var logChannel = message.guild.channels.find(c => c.name === 'log');

	var prefix = '-';


	if(command == prefix + 'ban') {

	if(!message.channel.guild) return message.reply(':no_entry: | This Command For Servers Only!'); 

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(':no_entry: | You dont have **BAN_MEMBERS** Permission!');

        if(!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.channel.send(':no_entry: | I dont have **BAN_MEMBERS** Permission!');

		if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');

//xRGRx .. By Julian

		if(!userM) return message.channel.send(`**➥ Useage:** ${prefix}ban \`\`@Name\`\` time reason`);

		if(userM.user.id === message.author.id) return message.channel.send(':no_entry: | Why you want ban **Your Self** ?');

		if(userM.user.id === message.guild.owner.id) return message.channel.send(':no_entry: | Nice try dude \:D');

		if(message.guild.member(userM.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_entry: | You cant give **${userM.user.username}** Ban beacuse him role highest then your role!`);

		if(message.guild.member(userM.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`:no_entry: | I cant give **${userM.user.username}** Ban beacuse him role highest then my role!`);

		if(!message.guild.member(userM.user).bannable) return message.channel.send(`:no_entry: | I cant give **${userM.user.username}** Ban.`);

//xRGRx .. By Julian

		var time = message.content.split(" ")[2];

		if(!time) time = '1d';


		if(!ms(time)) {

			var reason = message.content.split(' ')[2];

		}else {

			var reason = message.content.split(' ')[3];

		}


		if(!reason) reason = 'No reason provided.';


		userM.user.send(`:no_entry: | You have \`\`BANNED\`\` From the server **${message.guild.name}**, By: **${message.author.tag}**, Reason: \`\`${reason}\`\`, Time: **${time}**`).catch();

        message.guild.member(userM.user).ban({ reason: reason });

        message.channel.send(`:white_check_mark: | Successfully \`\`BANNED\`\` ${userM.user.username} from the server! :airplane: \`\`${reason}\`\``);

		//xRGRx .. By Julian

		let banInfo = new Discord.RichEmbed()

		.setTitle('**[BANNED]**')

		.setThumbnail(message.author.avatarURL)

		.setColor('GREEN')

		.setDescription(`**\n:airplane: Successfully \`\`BANNED\`\` **${userM.user.username}** From the server!\n\n**User:** <@${userM.user.id}> (ID: ${userM.user.id})\n**By:** <@${message.author.id}> (ID: ${message.author.id})\n**Reason:** \`\`${reason}\`\`\n**Time:** ${time}`)

		.setTimestamp()

		.setFooter(userM.user.tag, userM.user.avatarURL)


		if(logChannel) {

			logChannel.send(banInfo);

		}

		//xRGRx .. By Julian

		setTimeout(function() {

			message.guild.fetchBans().then(bans => {

				var Found = bans.find(m => m.id === userM.user.id);

				if(!Found) return;


				message.guild.unban(userM.user);


				let unbanInfo = new Discord.RichEmbed()

				.setTitle('**[UNBANNED]**')

				.setThumbnail(message.guild.iconURL)

				.setColor('GREEN')

				.setDescription(`**\n:airplane: Successfully \`\`UNBANNED\`\` **${userM.user.username}** From the server!\n\n**User:** <@${userM.user.id}> (ID: ${userM.user.id})\n**Reason:** \`\`Time Ended.\`\``)

				.setTimestamp()

				.setFooter(userM.user.tag, userM.user.avatarURL)


				if(logChannel) {

					logChannel.send(banInfo);

				}

			})

		}, ms(time))

	}

	if(command == prefix + 'unban') {

		//xRGRx .. By Julian

		 if(!message.channel.guild) return message.reply(':no_entry: | This Command For Servers Only!'); 

		if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(':no_entry: | You dont have **BAN_MEMBERS** Permission!');

		if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(':no_entry: | I dont have **BAN_MEMBERS** Permission!');

		if(!args[1]) return message.channel.send(':no_entry: | Please type the ID of user');

		if(args[1].length < 16) return message.reply(':no_entry: | This ID is not id user!');

		message.guild.fetchBans().then(bans => {

			var Found = bans.find(m => m.id === args[1]);

			if(!Found) return message.channel.send(`:no_entry: | <@${message.author.id}> This preson not have any ban from this server! :unlock:`);

			message.guild.unban(args[1]);

			message.channel.send(`:white_check_mark: Successfully \`\`UNBANNED\`\` <@${args[1]}> From the server!`);

			//xRGRx .. By Julian

			let banInfo = new Discord.RichEmbed()

			.setTitle('**[UNBANNED]**')

			.setThumbnail(message.author.avatarURL)

			.setColor('GREEN')

			.setDescription(`**\n:airplane: Successfully \`\`UNBANNED\`\` <@${args[1]}> From the server!\n\n**User:** <@${args[1]}> (ID: ${args[1]})\n**By:** <@${message.author.id}> (ID: ${message.author.id})`)

			.setTimestamp()

			.setFooter(userM.user.tag, userM.user.avatarURL)


			if(logChannel) {

				logChannel.send(banInfo);

			}

		})

	}

});




client.on('message', message => { 

if (message.author.bot) return;

var prefix = "-";

if (!message.content.startsWith(prefix)) return;

let command = message.content.split(" ")[0];

command = command.slice(prefix.length);

let args = message.content.split(" ").slice(1);

if (command == "mute") {

if(!message.channel.guild) return message.reply(':no_entry: | This Command For Servers Only!'); 

        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: | You dont have **MANAGE_ROLES** Permission!');

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: | I dont have **MANAGE_ROLES** Permission!');

let user = message.mentions.users.first();

let muteRole = message.guild.roles.find("name", "Muted");

if (!muteRole) return message.reply(":no_entry: Error | I Cant find 'Muted' Role").then(msg => {msg.delete(5000)});

if (message.mentions.users.size < 1) return message.reply('**➥ Useage:** -mute \`\`@Name\`\` reason');

let reason = message.content.split(" ").slice(2).join(" ");

message.guild.member(user).addRole(muteRole);

const muteembed = new Discord.RichEmbed()

.setColor("RANDOM")

.setAuthor(`Muted!`, user.displayAvatarURL)

.setThumbnail(user.displayAvatarURL)

.addField("**:busts_in_silhouette: المستخدم**", '**[ ' + `${user.tag}` + ' ]**',true)

.addField("**:hammer: تم بواسطة **", '**[ ' + `${message.author.tag}` + ' ]**',true)

.addField("**:book: السبب**", '**[ ' + `${reason}` + ' ]**',true)

.addField("User", user, true) 

  .setTitle('**[MUTED]**')

		.setThumbnail(message.author.avatarURL)

		.setColor('GREEN')

		.setDescription(`**\n:zipper_mouth: Successfully \`\`MUTED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${message.author.id}> (ID: ${message.author.id})\n**Reason:** \`\`${reason}\`\``)

		.setTimestamp()

		.setFooter(user.tag, user.avatarURL)

client.channels.find('name', "log").send({embed : muteembed});

}


if (command == "unmute") {

if(!message.channel.guild) return message.reply(':no_entry: | This Command For Servers Only!'); 

        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: | You dont have **MANAGE_ROLES** Permission!');

        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: | I dont have **MANAGE_ROLES** Permission!');

let user = message.mentions.users.first();

let muteRole = message.guild.roles.find("name", "Muted");

if (!muteRole) return message.reply(":no_entry: Error | I Cant find 'Muted' Role").then(msg => {msg.delete(5000)});

if (message.mentions.users.size < 1) return message.reply('**➥ Useage:** -unmute \`\`@Name\`\`');

let reason = message.content.split(" ").slice(2).join(" ");

message.guild.member(user).removeRole(muteRole);

const unmuteembed = new Discord.RichEmbed()

.setTitle('**[UNMUTED]**')

			.setThumbnail(message.author.avatarURL)

			.setColor('GREEN')

			.setDescription(`**\n:zipper_mouth: Successfully \`\`UNMUTED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${message.author.id}> (ID: ${message.author.id})`)

			.setTimestamp()

			.setFooter(user.tag, user.avatarURL)

client.channels.find('name', "log").send({embed : unmuteembed});

}

});



client.on('message', message => {
	if (message.author.bot) return;
const prefix = "-";
  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply(':no_entry: | This Command For Servers Only!'); 
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | You dont have **KICK_MEMBERS** Permission!');
        if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | I dont have **KICK_MEMBERS** Permission!');
 let args = message.content.split(" ").slice(1)
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");

  if (message.mentions.users.size < 1) return message.channel.send("**➥ Useage:** -kick \`\`@Name\`\` reason");
  if(!reason) return message.channel.send (":no_entry: | Please type the Reason");
  if (!message.guild.member(user)
  .bannable) return message.channel.send(":no_entry: | I cant give **${user.username}** Kick.");

  message.guild.member(user).kick(7, user);
  
  user.send(`:no_entry: | You have \`\`KICKED\`\` From the server **${message.guild.name}**, By: **${message.author.tag}**, Reason: \`\`${reason}\`\``).catch();
        message.channel.send(`:white_check_mark: | Successfully \`\`KICKED\`\` ${user.username} from the server! :airplane: \`\`${reason}\`\``);
		
  const banembed = new Discord.RichEmbed()
  .setTitle('**[KICKED]**')
		.setThumbnail(message.author.avatarURL)
		.setColor('GREEN')
		.setDescription(`**\n:airplane: Successfully \`\`KICKED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${message.author.id}> (ID: ${message.author.id})\n**Reason:** \`\`${reason}\`\``)
		.setTimestamp()
		.setFooter(user.tag, user.avatarURL)
  client.channels.find('name', "log").send({embed : banembed})
}
});
  client.on('message', message => {
    if(message.content.includes('discord.gg')){
                                            if(!message.channel.guild) return message.reply('** advertising me on DM ? 🤔   **');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete()
    return message.reply(`** No Invite Links :angry: !**`)
    }
}
});

client.on('message', message => {
    if(message.content.includes('discordapp.com/invite/')){
                                            if(!message.channel.guild) return message.reply('** advertising me on DM ? 🤔   **');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete()
    return message.reply(`** No Invite Links :angry: !**`)
    }
}
});




client.on('message', message => {
    var prefix = "-";         //<=== هنا تقدر تغير البريفكس
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {            //Codes Development .
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));         //Codes Development .
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);      //Codes Development .
let request = `Requested By ${message.author.username}`;
message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))   //Codes Development .

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`Chat will delete`).then(m => m.delete(5000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` Chat Deleted ``",
        color: 0x06DF00,
        footer: {          //Codes Development .

        }           //Codes Development .
      }}).then(msg => {msg.delete(3000)});

})     //Codes Development .
reaction2.on("collect", r => {   //Codes Development .
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});   //Codes Development .






client.on('message', message => {

var prefix = "-";

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

    if (message.content.startsWith("رابط")) {

  message.channel.createInvite({

        thing: true,

        maxUses: 100,

        maxAge: 86400

    }).then(invite =>

      message.author.sendMessage(invite.url)

    )

  message.channel.send("**تم ارسال الرابط برسالة خاصة**")

message.author.send(`**مدة الرابط : يـوم

عدد استخدامات الرابط : 100**`)

    }

});




client.on("message", message => {
	if (message.author.bot) return;
	var prefix = "-";
	var args = message.content.split(' ').slice(1); 
	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !msg.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: | You dont have **MANAGE_ROLES** Permission!');
	if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
		} 
	} 
});

var Julian = {};
client.on('guildMemberRemove', member => {
Julian[member.id] = {roles: member.roles.array()};
});

client.on('guildMemberAdd', member => {
if(!Julian[member.user.id]) return;
console.log(Julian[member.user.id].roles.length);
for(let i = 0; i < Julian[member.user.id].roles.length + 1; i++) {
member.addRole(Julian[member.user.id].roles.shift());
}
});



client.on("message", message => {
 if (message.content === "-help-m") {
  const embed = new Discord.RichEmbed() 
      .setColor("#ffff00")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`
                                ● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 
                   👑 『 اوامر ادارية』 👑
👑-bans 『 يقولك عدد الاشخاص المبندين من السيرفر 』
👑-ban 『 تبنيد عضو من السيرفر 』
👑-kick 『 طرد عضو من السيرفر 』
👑-clear 『 لمسح الشات 』
👑-mute  『 اعطاء ميوت كتابي 』
👑-unmute  『 فك الميوت الكتابي 』
👑-mc  『 تقفيل الشات 』
👑-umc  『 فتح الشات 』
👑-hide  『 إخفاء الروم 』
👑-show  『 إظهار الروم 』
                                ● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 
`)


message.author.sendEmbed(embed)

}
});

client.on('message', message => {
     if (message.content === "-help-m") {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#9B59B6")
  .addField(" Done | تــــم" , " |  تــــم ارســالك في الخــاص")
     
     
     
  message.channel.sendEmbed(embed);
    }
});


/// !hide

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
    if (message.content.startsWith("-bans")) {
        message.guild.fetchBans()
        .then(bans => message.channel.send(`${bans.size} عدد اشخاص المبندة من السيرفر `))
  .catch(console.error);
}
});  




client.login(process.env.MOD_TOKEN);
