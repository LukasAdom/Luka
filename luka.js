////////////////////////
////////WELCOME////////    
//////////////////////

const Discord = require('discord.js');
const JSON_FILE = require("jsonfile");
const fs = require('fs');
var Long = require("long");

var ID = 'nope'
var Token = 'nope'

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const randomPuppy = require('random-puppy');
const Random = require('random');

var stats = {};
if(fs.existsSync('stats.json')){
    stats = JSON_FILE.readFileSync('stats.json');
}

const prefix = '?';

const { Server } = require('http');
const { disconnect } = require('process');

client.command = new Discord.Collection();

const commandfiles = fs.readdirSync('./Commands/').filter(File => File.endsWith('.js'));
var epic = 'Are you trying to post NSFW content on a SFW Channel??!! \r\n That is unacceptable, I will notify '
var epic2 = '<@486891301615435776> And <@484750502022873096>'
var Bitch = "789449013317074954" 
var AnimeRole = "789450509382582287"
var programmerrole = "780691032550670357"
var PHM = "793941506893414420"

const bot = new Discord.Client();

for(const File of commandfiles){
    const command = require(`./Commands/${File}`);

    client.command.set(command.name, command);
}

client.once('ready', () => {
    console.log('Luka is alive!');
    client.user.setActivity("[?info]");
});

const getDefaultChannel = (guild) => {
    if(guild.channels.cache.has(guild.id))
      return guild.channels.cache.get(guild.id)
  
    const generalChannel = guild.channels.cache.find(channel => channel.name === "「👋」𝐍𝐚𝐮𝐣𝐨𝐤𝐚𝐢");
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
    let role = member.guild.roles.cache.find(r => r.name === "『🙃』𝐍𝐨𝐨𝐛");
    member.roles.add(role);
    channel.send(`Sveikas ${member} atvykes į :night_with_stars: Sofčius 𝕋𝕆𝕎ℕ!`);
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
        if(Userstats.level == 5){
            const role = member.guild.roles.cache.find(role => role.name === "『➗』𝟐𝐦𝐦");
            member.roles.add(role);
        } if(Userstats.level == 6){
            const role = member.guild.roles.cache.find(role => role.name === "『➗』𝟕.𝟐𝟗𝐜𝐦");
            member.roles.add(role);
        } if(Userstats.level == 7){
            const role = member.guild.roles.cache.find(role => role.name === "『➗』𝟖.𝟐𝐜𝐦");
            member.roles.add(role);
        } if(Userstats.level == 10){
            const role = member.guild.roles.cache.find(role => role.name === "『🎮』 𝐄𝐩𝐢𝐜 𝐆𝐚𝐦𝐞𝐫");
            member.roles.add(role);
        } if(Userstats.level == 15){
            const role = member.guild.roles.cache.find(role => role.name === "『🧟』𝐙̌𝐚𝐥𝐠𝐢𝐫𝐢𝐧𝐢𝐬");
            member.roles.add(role);
        } if(Userstats.level == 20){
            const role = member.guild.roles.cache.find(role => role.name === "『🚋』𝐑𝐚𝐣𝐨𝐧𝐢𝐧𝐢𝐬");
            member.roles.add(role);
        } if(Userstats.level == 25){
            const role = member.guild.roles.cache.find(role => role.name === "『👄』𝐆𝐞𝐫𝐤𝐥𝐢𝐧𝐢𝐬");
            member.roles.add(role);
        } if(Userstats.level == 30){
            const role = member.guild.roles.cache.find(role => role.name === "『💣』𝐃𝐮𝐦𝐁𝐮𝐦𝐢𝐧𝐢𝐬");
            member.roles.add(role);
        } if(Userstats.level == 35){
            const role = member.guild.roles.cache.find(role => role.name === "『🍺』𝐁𝐚𝐜𝐡𝐢𝐨𝐧𝐢𝐧𝐢𝐬");
            member.roles.add(role);
        }

        Userstats.xp = Userstats.xp - xpToNextLvl;
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        var color2 = "#" + randomColor
        const exampleEmbed3 = new Discord.MessageEmbed()
    .setColor(color2)
    .setTitle('Level up!')
    .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
    .addFields(
        { name: "🎉  " + message.author.username + " Has reached level " + Userstats.level + "  🎉", value: "⠀"}   
	)

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
        { name: '**?updatelog** (?upl)', value: 'Update Log' },
        { name: '**?sourcecode** (?sc)', value: "LukaBot's Source code" },
        { name: '**?ping (?pg)**', value: 'IP address 👨‍💻' },
        { name: '**?yt**', value: '**sofcius youtube channel**  :flushed:' },
        { name: '**?fuckyou**', value: 'Fuck you too' },
        { name: '**?meme (?mem)**', value: 'memes :flushed:' },
        { name: '**?kat (?ka)**', value: 'shows a picture of a cat 🐱' },
        { name: '**?programmerhumor (?pgh)**', value: 'Programmer humor 👨‍💻' },
        { name: '**?softwaregore (?sfg)**', value: 'ℸ ̣ ⍑ᒷ  𝙹リ ℸ ̣ 𝙹!¡ ᒲᔑ↸ᒷ' },
        { name: '**?mildlyinfuriating (?min)**', value: '😠' },
        { name: '**?boneappletea (?bat)**', value: 'it when you when go i where when up' },
        { name: '**?crappydesign (?crapd)**', value: '<:kerbe:780681151109922826>' },
        { name: '**?gachalifecringe (?glc)**', value: 'Just 😬' },
        { name: '**?gocommitdie (?gcd)**', value: '0.69 Bobux <:Christian_Server:780681146861355070>' },
        { name: '**?dank**', value: 'Dank memes' },
        { name: '**?earth (?eth)**', value: 'SFW pictures of earth porn' },
        { name: '**?wholesome (?wms)**', value: 'Luv u 💖' },
        { name: '**?cursed (?cur)**', value: '😱' },
        { name: '**MODS ONLY**', value: 'mod only commands are' },
        { name: '**?giverole**', value: 'Makes an embed on which people could get roles 🧰' },
        { name: '**?clear**', value: 'clears 100 messages 🧰' },
	)
    .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');

    const exampleEmbedNSFW = new Discord.MessageEmbed()
    .setColor("#" + randomColor)
    .setTitle('Info')
    .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
    .addFields(
        { name: '**NSFW**', value: 'Works only in NSFW channels' },
        { name: '**?hentai (?hen)**', value: 'Hentai is a genre of pornography with Anime or Manga styling  <:KawaiiPepe:780681144470470678>' },
        { name: '**?gifhentai (?gh)**', value: 'Gif' },
        { name: '**?cumhentai (?ch)**', value: 'Welcome to the cum zone, only cum inside anime girls  <:KawaiiPepe:780681144470470678>' },
        { name: '**?memehentai (?memeh)**', value: 'memes AND HENTAI :flushed:' },
        { name: '**?beasthentai (?bh)**', value: 'BEAST MODE' },
        { name: '**?mghentai (?mgh)**', value: 'Monster girl hentai :flushed:' },
        { name: '**?porn (?pr)**', value: '( • )( • )ԅ(≖⌣≖ԅ)' },
        { name: '**?anal (?an)**', value: 'Anal 😉' },
        { name: '**?cum (?cu)**', value: 'Coom' },
        { name: '**?twerk (?tw)**', value: 'Twek' },
        { name: '**?tittydrop (?ttd)**', value: 'Boing Boing' },
        { name: '**?boobs (?bo)**', value: 'Boobies <:XDflag:780681143548772392>' },
        { name: '**?cosplay (?cos)**', value: 'Nice' },
        { name: '**?pussy (?pus)**', value: ':cat2:' },
	)
    .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');

    const exampleEmbedLOG = new Discord.MessageEmbed()
    .setColor("#" + randomColor)
    .setTitle('Update Log')
    .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
    .addFields(
        { name: 'Update 12/31/2020', value: '⠀' },
        { name: '⠀', value: '⠀' },
        { name: 'Added ?wholesome (?wms)', value: '⠀' },
        { name: 'Added ?cursed (?cur)', value: '⠀' },
        { name: 'Added ?boneappletea (?bat)', value: '⠀' },
        
       
	)
    .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
        message.channel.send(ip);
    } else if (command == 'yt'){
        message.channel.send('https://www.youtube.com/channel/UCNa1lyfkwFi8yl1PDEBjIbg');
    }  else if (command == 'pg'){
        var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
        message.channel.send(ip);
    } else if (command == 'info'){
        message.channel.send(exampleEmbed);
    }   else if (command == 'info2'){
        message.channel.send(exampleEmbedNSFW);
    }  else if (command == 'updatelog'){
        message.channel.send(exampleEmbedLOG)
    }  else if (command == 'upl'){
        message.channel.send(exampleEmbedLOG)
    }  else if (command == 'sourcecode'){
        message.channel.send("https://github.com/LukasAdom/Luka");
    }   else if (command == 'sc'){
        message.channel.send("https://github.com/LukasAdom/Luka");
    } else if (command == 'fuckyou'){
        message.channel.send("<@" + message.author.id + "> Fuck you");
        message.author.send("https://cdn.discordapp.com/emojis/587026903584735243.gif?v=1")
        message.author.send("ℸ ̣ ⍑ᒷ  𝙹リ ℸ ̣ 𝙹!¡ ᒲᔑ↸ᒷ ╎ℸ ̣   ℸ ̣ 𝙹 ∷ᒷᔑ↸.  ℸ ̣ ⍑ᒷ  ∴ᔑᓭ ʖ∷𝙹⚍⊣⍑ℸ ̣  ᓭℸ ̣ ∷ᔑ╎⊣⍑ℸ ̣  ⎓∷𝙹ᒲ ℸ ̣ ⍑ᒷ 𝙹ꖎ↸")
    } else if (command == 'hentai'){
        if (message.channel.nsfw) {
            client.command.get('hentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } else if (command == 'hen'){
        if (message.channel.nsfw) {
            client.command.get('hentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } else if (command == 'porn'){
        if (message.channel.nsfw) {
            client.command.get('Porn').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

     else if (command == 'pr'){
        if (message.channel.nsfw) {
            client.command.get('Porn').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 
    
    else if (command == 'cumhentai'){
        if (message.channel.nsfw) {
            client.command.get('HentaiCum').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'ch'){
        if (message.channel.nsfw) {
            client.command.get('HentaiCum').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'gifhentai'){
        if (message.channel.nsfw) {
            client.command.get('GifHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'gh'){
        if (message.channel.nsfw) {
            client.command.get('GifHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'memehentai'){
        if (message.channel.nsfw) {
            client.command.get('MemeHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'memeh'){
        if (message.channel.nsfw) {
            client.command.get('MemeHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'beasthentai'){
        if (message.channel.nsfw) {
            client.command.get('BeastHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'bh'){
        if (message.channel.nsfw) {
            client.command.get('BeastHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'mghentai'){
        if (message.channel.nsfw) {
            client.command.get('MonHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'mgh'){
        if (message.channel.nsfw) {
            client.command.get('MonHentai').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'anal'){
        if (message.channel.nsfw) {
            client.command.get('Anal').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'an'){
        if (message.channel.nsfw) {
            client.command.get('Anal').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'cum'){
        if (message.channel.nsfw) {
            client.command.get('Cum').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'cu'){
        if (message.channel.nsfw) {
            client.command.get('Cum').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'twerk'){
        if (message.channel.nsfw) {
            client.command.get('Twerk').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'tw'){
        if (message.channel.nsfw) {
            client.command.get('Twerk').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'tittydrop'){
        if (message.channel.nsfw) {
            client.command.get('TittyDrop').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'ttd'){
        if (message.channel.nsfw) {
            client.command.get('TittyDrop').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'boobs'){
        if (message.channel.nsfw) {
            client.command.get('Boobs').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'bo'){
        if (message.channel.nsfw) {
            client.command.get('Boobs').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'cosplay'){
        if (message.channel.nsfw) {
            client.command.get('Cosplay').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'cos'){
        if (message.channel.nsfw) {
            client.command.get('Cosplay').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'pussy'){
        if (message.channel.nsfw) {
            client.command.get('Pussy').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

    else if (command == 'pus'){
        if (message.channel.nsfw) {
            client.command.get('Pussy').execute(message, args)
        } else {
            let kity = ["https://i.imgur.com/z1rPBgn.jpg", "https://i.imgur.com/svBbT1Z.jpg", "https://i.imgur.com/4AiXzf8.jpg", "https://i.imgur.com/ZigXHzX.mp4", "https://i.imgur.com/ggQUrJ9.mp4", "https://i.imgur.com/U0iADj9.mp4", "https://i.imgur.com/c5puGf3.mp4", "https://i.imgur.com/NUyttbn.mp4", "https://i.imgur.com/grXqcNw.mp4", "https://i.imgur.com/hDiXRa7.jpg"]

            message.channel.send(epic.concat(epic2), {files: [kity[Math.floor(Math.random() * 9)]]});
        } 

    } 

     if (command === 'meme') {
        client.command.get('memes').execute(message, args)
    }if (command === 'programmerhumor') {
        client.command.get('Pgh').execute(message, args)
    }if (command === 'gachalifecringe') {
        client.command.get('Glc').execute(message, args)
    }if (command === 'cursed') {
        client.command.get('Cursed').execute(message, args)
    }if (command === 'cur') {
        client.command.get('Cursed').execute(message, args)
    }if (command === 'gocommitdie') {
        client.command.get('Go').execute(message, args)
    }if (command === 'softwaregore') {
        client.command.get('SFG').execute(message, args)
    }if (command === 'dank') {
        client.command.get('Dank').execute(message, args)
    }if (command === 'earth') {
        client.command.get('Earth').execute(message, args)
    }if (command === 'mildlyinfuriating') {
        client.command.get('Mildlyinfuriating').execute(message, args)
    }if (command === 'crappydesign') {
        client.command.get('Crappydesign').execute(message, args)
    }if (command === 'kat') {
        client.command.get('kats').execute(message, args)
    }   if (command === 'mem') {
        client.command.get('memes').execute(message, args)
    }if (command === 'pgh') {
        client.command.get('Pgh').execute(message, args)
    }if (command === 'glc') {
        client.command.get('Glc').execute(message, args)
    }if (command === 'gcd') {
        client.command.get('Go').execute(message, args)
    }if (command === 'sfg') {
        client.command.get('SFG').execute(message, args)
    }if (command === 'dnk') {
        client.command.get('Dank').execute(message, args)
    }if (command === 'eth') {
        client.command.get('Earth').execute(message, args)
    }if (command === 'min') {
        client.command.get('Mildlyinfuriating').execute(message, args)
    }if (command === 'wholesome') {
        client.command.get('Wholesome').execute(message, args)
    }if (command === 'wms') {
        client.command.get('Wholesome').execute(message, args)
    }if (command === 'crapd') {
        client.command.get('Crappydesign').execute(message, args)
    }if (command === 'boneappletea') {
        client.command.get('BAT').execute(message, args)
    }if (command === 'bat') {
        client.command.get('BAT').execute(message, args)
    }if (command === 'ka') {
        client.command.get('kats').execute(message, args)
    } if (command === 'giverole'){     
        if(message.member.roles.cache.some(r => r.name === '『🧰』 𝐌𝐨𝐝𝐚𝐬')){
        const bat = message.guild.roles.cache.find(role => role.name == "『🍑』𝐁𝐢𝐭𝐜𝐡");
        const bat2 = message.guild.roles.cache.find(role => role.name == "『💖』𝐀𝐧𝐢𝐦𝐞");
        const bat3 = message.guild.roles.cache.find(role => role.name == "『💻』 𝐏𝐫𝐨𝐠𝐫𝐚𝐦𝐮𝐨𝐭𝐨𝐣𝐚𝐬");
        const exampleEmbed2 = new Discord.MessageEmbed()
        .setColor("#" + randomColor)
        .setTitle('Roles')
        .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
        .addFields(
            
            { name: `🍑  = 『🍑』𝐁𝐢𝐭𝐜𝐡`, value: '⠀' },
            { name: `💖  = 『💖』𝐀𝐧𝐢𝐦𝐞`, value: '⠀' },
            { name: `💻  = 『💻』𝐏𝐫𝐨𝐠𝐫𝐚𝐦𝐮𝐨𝐭𝐨𝐣𝐚𝐬`, value: '⠀' },
            { name: `🍆  = 『🍆』𝐏𝐨𝐫𝐧𝐇𝐮𝐛 𝐌𝐚𝐬𝐭𝐞𝐫`, value: '⠀' }
        )
        .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');
        message.channel.send({embed: exampleEmbed2}).then(embedMessage => {
            embedMessage.react("🍑");
            embedMessage.react("💖");
            embedMessage.react("💻");
            embedMessage.react("🍆");
        });
        } else {
            message.channel.send("**Error 53: Invalid permissions**")
        } 

    } if (command === 'clear'){
        if(message.member.roles.cache.some(r => r.name === '『🧰』 𝐌𝐨𝐝𝐚𝐬')){
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
        sendImage();
        setTimeout(function(){
        const hook = new Discord.WebhookClient(ID, Token);
        const exampleEmbed90 = new Discord.MessageEmbed()
	    .setTitle('Hit or stand?')
        message.channel.send(exampleEmbed90).then(embedMessage => {
            embedMessage.react("⏫");
            embedMessage.react("⏬");
        });
        }, 850);   
    }

    client.on("messageReactionAdd", async (reaction, user) => {
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
        if(!reaction.message.guild) return;
            if(reaction.emoji.name === '🍑'){
                await reaction.message.guild.members.cache.get(user.id).roles.add(Bitch)
            } else if(reaction.emoji.name === '💖'){
                await reaction.message.guild.members.cache.get(user.id).roles.add(AnimeRole)
            } else if(reaction.emoji.name === '💻'){
                await reaction.message.guild.members.cache.get(user.id).roles.add(programmerrole)
            }  else if(reaction.emoji.name === '🍆'){
                await reaction.message.guild.members.cache.get(user.id).roles.add(PHM)
            }   else if(reaction.emoji.name === '🅰️'){
                
            } 
    });

    client.on("messageReactionRemove", async (reaction, user) => {
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
        if(!reaction.message.guild) return;
        if(reaction.emoji.name === '🍑'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Bitch)
        } else if(reaction.emoji.name === '💖'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(AnimeRole)
        } else if(reaction.emoji.name === '💻'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(programmerrole)
        } else if(reaction.emoji.name === '🍆'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(PHM)
        } 
    });

    var NUMB = 0;
    var NUMB2 = 0;
    var NUMB3 = 0;
    var NumbRL = 0;
    var NumbRL2 = 0;

    async function sendImage() {
        let embeds = [];
        const hook = new Discord.WebhookClient('nope', "nope");
        let img = [
            'https://i.imgur.com/uLsuVLp.png',
            'https://i.imgur.com/LZ85ZYw.png',
            'https://i.imgur.com/vBEXmTS.png',
            'https://i.imgur.com/NbmP0Z6.png',
            'https://i.imgur.com/Cawm8Bv.png',
            'https://i.imgur.com/upVlB1D.png',
            'https://i.imgur.com/g2L5lZk.png',
            'https://i.imgur.com/Adpq7C0.png',
            'https://i.imgur.com/xyMoquC.png',
            'https://i.imgur.com/qKg9ODP.png'
          ];

          let idk = Math.floor(Math.random() * 8)
          let idk2 = Math.floor(Math.random() * 8)

          // Don't mind all of these else if statement //

          embeds.push(new Discord.MessageEmbed()
          .setTitle('Bot')
          .setImage(img[9])
          .setTimestamp()
          .setFooter('Pulled time:'));
          NumbRL = Math.floor(Math.random() * (10 - 2) + 2);

          embeds.push(new Discord.MessageEmbed()
          .setTitle('Bot')
          .setImage(img[9])
          .setTimestamp()
          .setFooter('Pulled time:'));
          NumbRL2 = Math.floor(Math.random() * (10 - 2) + 2);

        embeds.push(new Discord.MessageEmbed()
                .setTitle('Player')
                .setImage(img[idk])
                .setTimestamp()
                .setFooter('Pulled time:'));
                if(idk == 0){
                    NUMB = 2;
                } else if(idk === 1){
                    NUMB = 3;
                } else if(idk === 2){
                    NUMB = 4;
                } else if(idk === 3){
                    NUMB = 5;
                } else if(idk === 4){
                    NUMB = 6;
                } else if(idk === 5){
                    NUMB = 7;
                } else if(idk === 6){
                    NUMB = 8;
                } else if(idk === 7){
                    NUMB = 9;
                }  else if(idk === 8){
                    NUMB = 10;
                }
                embeds.push(new Discord.MessageEmbed()
                .setTitle('Player')
                .setImage(img[idk2])
                .setTimestamp()
                .setFooter('Pulled time:'));
                if(idk2 === 0){
                    NUMB2 = 2;
                } else if(idk2 === 1){
                    NUMB2 = 3;
                } else if(idk2 === 2){
                    NUMB2 = 4;
                } else if(idk2 === 3){
                    NUMB2 = 5;
                } else if(idk2 === 4){
                    NUMB2 = 6;
                } else if(idk2 === 5){
                    NUMB2 = 7;
                } else if(idk2 === 6){
                    NUMB2 = 8;
                } else if(idk2 === 7){
                    NUMB2 = 9;
                }  else if(idk2 === 8){
                    NUMB2 = 10;
                }
                console.log(NumbRL);
                console.log(NumbRL2);
                console.log(NumbRL + NumbRL2);
                console.log(NUMB + NUMB2);
                hook.send({embeds: embeds});
      }

});

function sendImage2() {
    const hook = new Discord.WebhookClient(ID, Token);
        let img = [
            'https://i.imgur.com/uLsuVLp.png',
            'https://i.imgur.com/LZ85ZYw.png',
            'https://i.imgur.com/vBEXmTS.png',
            'https://i.imgur.com/NbmP0Z6.png',
            'https://i.imgur.com/Cawm8Bv.png',
            'https://i.imgur.com/upVlB1D.png',
            'https://i.imgur.com/g2L5lZk.png',
            'https://i.imgur.com/Adpq7C0.png',
            'https://i.imgur.com/xyMoquC.png',
            'https://i.imgur.com/qKg9ODP.png'
          ];

          let idk3 = Math.floor(Math.random() * 8)
    const exampleEmbed91 = new Discord.MessageEmbed()
    .setTitle('Player')
    .setImage(img[idk3])
    .setTimestamp()
    .setFooter('Pulled time:');

    if(idk3 === 0){
        NUMB3 = 2;
    } else if(idk3 === 1){
        NUMB3 = 3;
    } else if(idk3 === 2){
        NUMB3 = 4;
    } else if(idk3 === 3){
        NUMB3 = 5;
    } else if(idk3 === 4){
        NUMB3 = 6;
    } else if(idk3 === 5){
        NUMB3 = 7;
    } else if(idk3 === 6){
        NUMB3 = 8;
    } else if(idk3 === 7){
        NUMB3 = 9;
    }  else if(idk3 === 8){
        NUMB3 = 10;
    }
    console.log(NUMB3);
    hook.send({embeds: exampleEmbed91});
}
















































client.login(process.env.token);
