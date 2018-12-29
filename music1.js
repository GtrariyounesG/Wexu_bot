const Discord = require('discord.js');
const Util = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');
const fs = require('fs');
const client = new Discord.Client({disableEveryone: true});
const prefix = "1";
var adminprefix = '1'

/// Help !


client.on("message", message => {
 if (message.content === "1help") {
  const embed = new Discord.RichEmbed() 
      .setColor("#ffff00")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`
                                ● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ●
:musical_note: 1play | لتشغيل اغنية
:musical_note: 1join | دخول رومك الصوتي 
:musical_note: 1disconnect | الخروج من رومك الصوتي 
:musical_note: 1skip | تخطي الأغنية 
:musical_note: 1pause |ايقاف الاغنية مؤقتا
:musical_note: 1resume | تكملة الاغنية 
:musical_note: 1queue | اظهار قائمة التشغيل
:musical_note: 1np | اظهار الاغنية اللي انت مشغلها حاليا 
:musical_note: 1avatar | افاتار الشخص المطلوب 
:musical_note: 1ping | معرفة ping البوت 
                                ● ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ● 
`)


message.author.sendEmbed(embed)

}
});

client.on('message', message => {
     if (message.content === "1help") {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#9B59B6")
  .addField(" Check You DM :hammer_pick: " , " Coffee Music !! ")
     
     
     
  message.channel.sendEmbed(embed);
    }
});






/// Stats + Name + Avatar !

const developers = ['399697177259147275'];

console.log("Za1DDDDdd");

client.on('ready', () => {
    console.log(`Logged as ${client.user.tag}By : zaid`)
})

client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
  if (message.content.startsWith(prefix + 'setplay')) {
    client.user.setGame(argresult);
      message.channel.send(`تم تغيير البلاينق الى   ${argresult}`)
  } else 
     if (message.content === (prefix + "quit")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(prefix + 'setwt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`تَم تغيير الواتشينق الى   ${argresult}`)
  } else 
  if (message.content.startsWith(prefix + 'setls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`تَم تغيير الليسينينق الى   ${argresult}`)
  } else
  if (message.content.startsWith(prefix + 'setstream')) {
    client.user.setGame(argresult, "https://www.twitch.tv/Randy");
      message.channel.send(`تم تغييرك حالتك بالتويتش الى   ${argresult}`)
  }
  if (message.content.startsWith(prefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`جاري تغيير الأسم لـ ..${argresult} `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`جاري تغيير الأفتار... : `);
}
});

client.on('ready', () => {
     client.user.setActivity("Music | 1play",{type: 'LISTENING'});
});

/// AFK - Voice Room    

client.on('ready', () => {
var x = client.channels.get("526039415265558528"); 
if (x) x.join();
}); 






/// Ping !

client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;

    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `ping`) {
    let embed = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Pong!!")
    .setDescription(`${client.ping} ms,`)
    .setFooter(`Requested by | ${msg.author.tag}`);
    msg.delete().catch(O_o=>{})
    msg.channel.send(embed);
    }
});







/// Avatar !

client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;

    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `avatar`){
	if(msg.channel.type === 'dm') return msg.channel.send("Nope Nope!! u can't use avatar command in DMs (:")
        let mentions = msg.mentions.members.first()
        if(!mentions) {
          let sicon = msg.author.avatarURL
          let embed = new Discord.RichEmbed()
          .setImage(msg.author.avatarURL)
          .setColor("#ff0000")
          msg.channel.send({embed})
        } else {
          let sicon = mentions.user.avatarURL
          let embed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setImage(sicon)
          msg.channel.send({embed})
        }
    };
});




/// Music !!

client.on('message', async msg => {
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;

    const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');

	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;

        if (!voiceChannel) return msg.channel.send("Join a Voice CHannel First.");

        const permissions = voiceChannel.permissionsFor(msg.client.user);

        if (!permissions.has('CONNECT')) {

			return msg.channel.send("I don't have permissions to join this room");
        }

		if (!permissions.has('SPEAK')) {

			return msg.channel.send("I can't speak in this room");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("I Don't have permissions to send link ➙`EMBED_LINKS`")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();


			for (const video of Object.values(videos)) {

                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
		} else {

			try {

                var video = await youtube.getVideo(url);

			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)

					.setColor("#ff0000")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})

/////////////////
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Time out : you did not select a song');
                    }

					const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);

				} catch (err) {

					console.error(err);
					return msg.channel.send("I didn't find any results!");
				}
			}

            return handleVideo(video, msg, voiceChannel);

        }

	} else if (command === `skip`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Have to be in a Voice CHannel");
        if (!serverQueue) return msg.channel.send("No Songs to skip");

		serverQueue.connection.dispatcher.end(':fast_forward: Skipped');
        return undefined;

	} else if (command === `stop`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Have to be in a Voice CHannel");
        if (!serverQueue) return msg.channel.send("There is no Queue to stop!!");

		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Song Stopped');
        return undefined;

	} else if (command === `vol`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Have to be in a Voice CHannel");
		if (!serverQueue) return msg.channel.send('This command works only when playing a video');
        if (!args[1]) return msg.channel.send(`Volume changed to : **${serverQueue.volume}**`);

		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);

        return msg.channel.send(`Volume is : **${args[1]}**`);

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('There is no Queue!');
		const embedNP = new Discord.RichEmbed()
	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
			.setColor("#ff0000")
        return msg.channel.sendEmbed(embedNP);

	} else if (command === `queue`) {

		if (!serverQueue) return msg.channel.send('There is no Queue!!');
		let index = 0;
//	//	//
		const embedqu = new Discord.RichEmbed()
        .setTitle("The Queue Songs :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#ff0000")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Stoped');
		}
		return msg.channel.send('waiting for resumeing the video');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            return msg.channel.send('Resumeing');

		}
		return msg.channel.send('Queue is empty!');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);


	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}!`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Can't join this channel: ${error}!`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}**, Added the video to the queue.`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**${song.title}**, is now playing!`);
}




client.login(process.env.opl);
