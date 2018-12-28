const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "z"
const fs = require("fs"); 
const moment = require("moment");  
const ms = require("ms");


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity("Coffee",{type: 'WATCHING'})
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



client.on('message', message => {
  if(message.author.bot || message.channel.type == 'dm') return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
 
  if(!message.content.toLowerCase().startsWith(prefix)) return;
 
  if(command == 'embed') {
    let title,
        text,
        color;
    message.channel.send(`The Message ?`).then(m => { 
          message.channel.awaitMessages(res => res.content && res.author.id == message.author.id, {
            max: 1,
            time: 120000,
            errors: ['time'],
          }).then(col => {
            text = col.first().content;
            col.first().delete();
            m.edit(`The Color?`).then(m => {
              message.channel.awaitMessages(res => res.content && res.author.id == message.author.id, {
                max: 1,
                time: 120000,
                errors: ['time'],
              }).then(col => {
                    col.first().delete();
                    color = col.first().content;
                    let embed = new Discord.RichEmbed()
                    .addField(`****`, `**${text}**`)
                    .setColor(color) 
                    .setFooter(`${message.guild.name}`)
      message.channel.send(embed)
                  });
                });
              });
            });
        }
});



client.login(process.env.zezo);

