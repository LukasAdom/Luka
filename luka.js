const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const randomPuppy = require('random-puppy');

const prefix = '!';

const fs = require('fs');
const { Server } = require('http');
const { disconnect } = require('process');

client.command = new Discord.Collection();

const commandfiles = fs.readdirSync('./Commands/').filter(File => File.endsWith('.js'));
var epic = 'Are you trying to post NSFW content on a SFW Channel??!! \r\n That is unacceptable, I will notify '
var epic2 = '<@486891301615435776> And <@484750502022873096>'

const bot = new Discord.Client();

for(const File of commandfiles){
    const command = require(`./Commands/${File}`);

    client.command.set(command.name, command);
}

client.once('ready', () => {
    console.log('Luka is alive!');
    client.user.setActivity("[!info]");
});

//client.on("guildMemberAdd", member => {
 //   let welcome = member.guild.channels.cache.find(channel => channel.name === 'welcome');
  //  let role = member.guild.roles.cache.find(r => r.name === "Normie");
   // member.roles.add(role);
   // welcome.send("<@" + member.id + `> Has joined ${member.guild.name}`);
 // });

  //client.on("guildMemberRemove", member => {
    //let welcome = member.guild.channels.cache.find(channel => channel.name === 'welcome');
    //welcome.send("<@" + member.id + "> Has lefted the server :sob:");
 // });

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#" + randomColor)
    .setTitle('Info')
    .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
    .addFields(
        { name: '**!ping**', value: 'IP address 👨‍💻' },
        { name: '**!yt**', value: '**sofcius youtube channel**  :flushed:' },
        { name: '**!fuckyou**', value: 'Fuck you too' },
        { name: '**!meme**', value: 'memes' },
        { name: '**!hentai**', value: 'only works on NSFW channels' },
        { name: '**!doggo**', value: 'shows a picture of a puppy 🐶' },
        { name: '**!kat**', value: 'shows a picture of a cat 🐱' },
        { name: '**MODS ONLY**', value: 'mod only commands are' },
        { name: '**!giverole**', value: 'Makes an embed on which people could get roles' },
        { name: '**!clear**', value: 'clears 100 messages' }
	)
    .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');

    if(command === 'ping'){
        var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
        message.channel.send(ip);
    } else if (command == 'yt'){
        message.channel.send('https://www.youtube.com/channel/UCNa1lyfkwFi8yl1PDEBjIbg');
    } else if (command == 'info'){
        message.channel.send(exampleEmbed);
    } else if (command == 'fuckyou'){
        message.channel.send("<@" + message.author.id + "> Fuck you");
        message.author.send("https://cdn.discordapp.com/emojis/587026903584735243.gif?v=1")
        message.author.send("ℸ ̣ ⍑ᒷ  𝙹リ ℸ ̣ 𝙹!¡ ᒲᔑ↸ᒷ ╎ℸ ̣   ℸ ̣ 𝙹 ∷ᒷᔑ↸.  ℸ ̣ ⍑ᒷ  ∴ᔑᓭ ʖ∷𝙹⚍⊣⍑ℸ ̣  ᓭℸ ̣ ∷ᔑ╎⊣⍑ℸ ̣  ⎓∷𝙹ᒲ ℸ ̣ ⍑ᒷ 𝙹ꖎ↸")
    } else if (command == 'hentai'){
        if (message.channel.nsfw) {
            client.command.get('hentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 10 - 1)]]});
        } 

    } else if (command == 'doggo'){   
        randomPuppy()
    .then(url => {
        message.channel.send("Here is a cute doggo <@" + message.author.id + ">", {files: [url]});
    })
    } if (command === 'meme') {
        client.command.get('memes').execute(message, args)
    } if (command === 'kat') {
        client.command.get('kats').execute(message, args)
    } if (command === 'giverole'){     
        if(message.member.roles.cache.some(r => r.name === 'Mod')){
        const exampleEmbed2 = new Discord.MessageEmbed()
        .setColor("#" + randomColor)
        .setTitle('Roles')
        .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
        .setDescription('test')
        .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');
        message.channel.send({embed: exampleEmbed2}).then(embedMessage => {
            embedMessage.react("🔴");
            embedMessage.react("🔷");
            embedMessage.react("🟨");
        });
        } else {
            message.channel.send("**Error 53: Invalid permissions**")
        }

    } if (command === 'clear'){
        if(message.member.roles.cache.some(r => r.name === 'Mod')){
        message.channel.bulkDelete(100).then(() => {
            message.channel.send("").then(msg => msg.delete(3000));
          });
        } else {
            message.channel.send("**Error 53: Invalid permissions**")
        }
    }
});

var Role1 = '782957166687551508'
var Role2 = '782957220765761548'
var Role3 = '783048765169860638'

client.on("messageReactionAdd", async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(!reaction.message.guild) return;
    if(reaction.message.channel.id === "782956665435455568"){
        if(reaction.emoji.name === '🔴'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(Role1)
        } else if(reaction.emoji.name === '🔷'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(Role2)
        } else if(reaction.emoji.name === '🟨'){
            await reaction.message.guild.members.cache.get(user.id).roles.add(Role3)
        }
    }
});

client.on("messageReactionRemove", async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(!reaction.message.guild) return;
    if(reaction.message.channel.id === "782956665435455568"){
        if(reaction.emoji.name === '🔴'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Role1)
        } else if(reaction.emoji.name === '🔷'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Role2)
        } else if(reaction.emoji.name === '🟨'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Role3)
        }
    }
});




















































client.login('Token');
