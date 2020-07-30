const { Client, Message } = require('discord.js'); // !important

/**
 * Commande setEmote
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = (bot, message, args) => {
    if (!message.member.roles.cache.find(role => role.id === bot.config.roles.vip)) return message.reply('', { embed: {
        color: bot.config.colors.error,
        description: `${bot.config.emotes.error} Vous ne possédez pas le grade VIP.`
    } });
    // * Configuration des emotes
    let emotes = ["green", "red", "blue", "yellow"];
    var emote;
    if (!args[0]) return message.reply('', { embed: {
        color: bot.config.colors.error,
        description: `${bot.config.emotes.error} Voici la liste des emotes disponibles : ${emotes.map(emote => `\`${emote}\``).join(', ')}`
    } });
    switch (args[0].toLowerCase()) {
        case 'green':
            emote = bot.config.emotes.green;
        break;
        case 'blue':
            emote = bot.config.emotes.blue;
        break;
        case 'red':
            emote = bot.config.emotes.red;
        break;
        case 'yellow':
            emote = bot.config.emotes.yellow;
        break;
        default:
            return message.reply('', { embed: {
                color: bot.config.colors.error,
                description: `${bot.config.emotes.error} Voici la liste des emotes disponibles : ${emotes.map(emote => `\`${emote}\``).join(', ')}`
            } });
    }
    // * Sauvegarder dans la base de donnée
    bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).assign({ emote: emote }).write();
    // * Réponse finale
    return message.channel.send('', { embed: {
        color: bot.config.colors.success,
        description: `${bot.config.emotes.success} ${message.author} L'emote de votre profile a été actualisée.`
    } });
}

module.exports.help = {
    name: "setemote",
    description: "Change l'emote de votre profile.",
    category: "VIP",
    aliases: ["setemoji"],
    usage: "<green|red|blue|yellow>"
}