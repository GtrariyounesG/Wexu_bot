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
client.user.setGame(`Welcoming. `,'https://www.twitch.tv/ImD3s_x');	
}); 


client.on('guildMemberAdd', msg => { 
    var embed = new Discord.RichEmbed()
    .setAuthor(msg.user.username, msg.user.avatarURL)
    .setThumbnail(msg.user.avatarURL)
    .setImage('حط رابط الصورة هني')     
    .setTitle('عضو جديد!')
    .setDescription('مرحبا بك بالسيرفر')
    .addField('``ايدي العضو``:',"" +  msg.user.id, true)
    .addField('``تاق العضو``', msg.user.discriminator, true)
    .addField('``تم الانشاء في``', msg.user.createdAt, true)
    .addField(' :bust_in_silhouette:  انت رقم',`**[ ${msg.guild.memberCount} ]**`,true)
    .setColor('GREEN')
    .setFooter(msg.guild.name, msg.guild.iconURL, true)
    var channel = msg.guild.channels.find('name', 'lobby')        //تقدر تغير اسم الشانل حق الترحيب
    if (!channel) return;
    channel.send({embed : embed});
    });





client.login(process.env.WL_TOKEN);
