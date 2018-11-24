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
    .setImage('https://www.google.com.kw/search?biw=1821&bih=876&tbm=isch&sa=1&ei=3P_4W8_PFsOdgAbnmImACw&q=Welcome&oq=Welcome&gs_l=img.3..0i67l2j0l5j0i67j0j0i67.27172.28014..28050...0.0..0.195.195.0j1......1....1..gws-wiz-img.1SdYKhMkc-s#imgrc=Mj2oe2irQFezuM:')     
    .setTitle('عضو جديد!')
    .setDescription('مرحبا بك بالسيرفر')
    .addField('``ايدي العضو``:',"" +  msg.user.id, true)
    .addField('``تاق العضو``', msg.user.discriminator, true)
    .addField('``تم الانشاء في``', msg.user.createdAt, true)
    .addField(' :bust_in_silhouette:  انت رقم',`**[ ${msg.guild.memberCount} ]**`,true)
    .setColor('GREEN')
    .setFooter(msg.guild.name, msg.guild.iconURL, true)
    var channel = msg.guild.channels.find('name', '𝘼𝙂-𝙂𝙚𝙣𝙚𝙧𝙖𝙡')        //تقدر تغير اسم الشانل حق الترحيب
    if (!channel) return;
    channel.send({embed : embed});
    });





client.login(process.env.WL_TOKEN);
