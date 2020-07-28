const { Client, Message } = require('discord.js'); // !important
const Random = require('../Classes/Random');

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
        if (message.content.startsWith(bot.config.prefix)) return;
        var xpWon = Random.between(5, 10);
        if (!bot.db.get('profil').find({ guild: message.guild.id })) return;
    };

    // * Partie commande

    if (!message.content.startsWith(bot.config.prefix));
    var args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();
    var command;

    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args);
}