const { Client, Message } = require('discord.js'); // !important
const Random = require('../Classes/Random'); // !important

/**
 * Événement message
 * 
 * @param {Client} bot 
 * @param {Message} message
 */
module.exports = async (bot, message) => {
    // ! Conditions importantes
    if (!bot.config.guilds.includes(message.guild.id)) return;
    if (message.author.bot) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.author);
    
    // * Partie traitement

    if (!bot.db.get('ignore_channel').find({ guild: message.guild.id, channel: message.channel.id }).value()) {
        if (!message.content.startsWith(bot.config.prefix)) {
            var xpWon = Random.between(5, 10);
            if (!bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).value()) return bot.db.get('profil').push({ _id: Random.generateID(20),guild: message.guild.id, user: message.author.id, xp: xpWon, lvl: 0, but: 1500, money: 0, description: null, color: null, emote: null }).write();
            var profil = Object.values(bot.db.get('profil').filter({ guild: message.guild.id, user: message.author.id }).find('user').value());
            if ((profil[3] + xpWon) >= profil[5]) {
                let difference = (profil[3] += xpWon) - profil[5];
                bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).assign({ xp: difference, but: profil[5]+=390, lvl: profil[4]+=1 }).write();
                message.react("🆙").then(msg => {
                    let channelLvlUp = message.guild.channels.cache.find(channel => channel.id === bot.config.channels.lvl);
                    channelLvlUp.send(``, { embed: {
                        color: bot.config.colors.success,
                        description: `**GG ${message.author}! Vous êtes arrivé(e) niveau \`${profil[4]}\`** 🎉`
                    } });
                });
            } else {
                bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).assign({ xp: profil[3]+=xpWon }).write();
            }
        }
    };

    // * Partie commande

    if (!message.content.startsWith(bot.config.prefix)) return;
    var args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();
    var command;

    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args);
}