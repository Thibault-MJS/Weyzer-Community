const { Client, Message } = require('discord.js'); // !important

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

    // * Partie commande

    if (!message.content.startsWith(bot.config.prefix));
    var args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();
    var command;

    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args);
}