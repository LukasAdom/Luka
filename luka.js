////////////////////////
////////WELCOME////////    
//////////////////////

const Discord = require('discord.js');
const JSON_FILE = require("jsonfile");
const fs = require('fs');
var Long = require("long");

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const randomPuppy = require('random-puppy');
const Random = require('random');

var stats = {};
if(fs.existsSync('stats.json')){
    stats = JSON_FILE.readFileSync('stats.json');
}

const prefix = '!';

const { Server } = require('http');
const { disconnect } = require('process');

client.command = new Discord.Collection();

const commandfiles = fs.readdirSync('./Commands/').filter(File => File.endsWith('.js'));
var epic = 'Are you trying to post NSFW content on a SFW Channel??!! \r\n That is unacceptable, I will notify '
var epic2 = '<@486891301615435776> And <@484750502022873096>'
var Role1 = '782957166687551508'
var Role2 = '782957220765761548'
var Role3 = '783048765169860638'
var Role4 = '783291095760896073'
var Role5 = '783310707961364532'

const bot = new Discord.Client();

for(const File of commandfiles){
    const command = require(`./Commands/${File}`);

    client.command.set(command.name, command);
}

client.once('ready', () => {
    console.log('Luka is alive!');
    client.user.setActivity("[!info]");
});

const getDefaultChannel = (guild) => {
    if(guild.channels.cache.has(guild.id))
      return guild.channels.cache.get(guild.id)
  
    const generalChannel = guild.channels.cache.find(channel => channel.name === "welcome");
    if (generalChannel)
      return generalChannel;

    return guild.channels.cache
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
  }

  client.on("guildMemberAdd", member => {
    const channel = getDefaultChannel(member.guild);
    let role = member.guild.roles.cache.find(r => r.name === "Normie");
    member.roles.add(role);
    channel.send(`Welcome ${member} to the server`);
  });

client.on('message', message => {
    if(message.author.id == client.user.id)
        return;

    if(message.guild.id in stats === false){
        stats[message.guild.id] = {};
    }
    const guildstat = stats[message.guild.id];
    if(message.author.id in guildstat === false){
        guildstat[message.author.id] = {
            xp: 0,
            level: 0,
            LAST_MESSAGE: 0
        };
    }

    const Userstats = guildstat[message.author.id];

    if(Date.now() - Userstats.LAST_MESSAGE > 5000){
    Userstats.xp += Random.int(15, 25);
    Userstats.LAST_MESSAGE = Date.now();

    const xpToNextLvl = 5 * Math.pow(Userstats.level, 2) + 50 * Userstats.level + 100;
    if(Userstats.xp >= xpToNextLvl){
        Userstats.level++;
        if(Userstats.level = 5){
            message.guild.members.cache.get(message.author.id).roles.add(Role4);
        } if(Userstats.level = 6){
            message.guild.members.cache.get(message.author.id).roles.remove(Role4);
            message.guild.members.cache.get(message.author.id).roles.add(Role5);
        }
        Userstats.xp = Userstats.xp - xpToNextLvl;
        const exampleEmbed3 = new Discord.MessageEmbed()
    .setColor("#52ffd7")
    .setTitle('Level up!')
    .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
    .addFields(
        { name: "🎉  " + message.author.username + " Has reached level " + Userstats.level + "  🎉", value: "⠀"}   
	)
        message.channel.send(exampleEmbed3);
    }

    JSON_FILE.writeFileSync('stats.json', stats);

    console.log(message.author.username + ' Now has ' + Userstats.xp);
    console.log(xpToNextLvl + ' That much xp needed for level');
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

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
        { name: '**!kat**', value: 'shows a picture of a cat 🐱' },
        { name: '**MODS ONLY**', value: 'mod only commands are' },
        { name: '**!giverole**', value: 'Makes an embed on which people could get roles' },
        { name: '**!clear**', value: 'clears 100 messages' }
	)
    .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

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
        message.channel.bulkDelete(50).then(() => {
            message.channel.send("").then(msg => msg.delete(3000));
            

          });

        } else {
            message.channel.send("**Error 53: Invalid permissions**")
        }

    } if(command == 'givexp'){
        if(message.member.roles.cache.some(r => r.name === '')){
     const exampleEmbed5 = new Discord.MessageEmbed()
    .setColor("#" + randomColor)
    .setTitle('XP')
    .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
    .setDescription('test')
    .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');
    message.channel.send({embed: exampleEmbed5}).then(embedMessage => {
        embedMessage.react("😍");
    });
        } else {
            message.channel.send("**Error 404: Invalid Command**")
        }
    }

    if(command == 'blackjack'){
        const exampleEmbedBlk = new Discord.MessageEmbed()
        .setImage('https://i.imgur.com/wSTFkRM.png')
        
    }

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
    

});


















































client.login(process.env.token);
