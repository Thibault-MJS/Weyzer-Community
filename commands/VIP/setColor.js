const { Client, Message } = require('discord.js'); // !important

/**
 * Commande setColor
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
    // * Configuration de la couleur
    var color = args[0];
    if (!color || !color.match(/^#[0-9a-fA-F]{3,6}$/i)) return message.reply('', { embed: {
        color: bot.config.colors.error,
        description: `${bot.config.emotes.error} Veuillez choisir votre couleur [ici](https://mycolor.space/).`
    } });
    // * Réponse finale
    return message.channel.send('', { embed: {
        color: bot.config.colors.success,
        description: `${bot.config.emotes.success} La couleur de votre profile a été actualisée.`
    } });
}

module.exports.help = {
    name: "setcolor",
    aliases: ["setc"],
    description: "Change la couleur de votre profile.",
    category: "VIP",
    usage: "<couleur_héxadécimal>"
}