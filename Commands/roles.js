const Discord = require('discord.js');

const client = new Discord.Client();


module.exports.as = {
    name: 'roles',
    description: 'give role',
    execute(message, args){
const exampleEmbed2 = new Discord.MessageEmbed()
        .setColor("#" + randomColor)
        .setTitle('Roles')
        .setAuthor('LukaBot', 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391')
        .setDescription('test')
        .setFooter("created using unity's particle system", 'https://cdn.discordapp.com/avatars/780682518336241664/41dc7531bfe05faf3508d0bfdab1b391');
        message.channel.send({embed: exampleEmbed2}).then(embedMessage => {
            embedMessage.react("👍");
        });
    }
}
