const { Client, Message } = require('discord.js'); // !important

/**
 * Commande setDescription
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
    // * Configuration de la description
    var description = args.slice(0).join(' ');
    if (!description) return message.reply('', { embed: {
        color: bot.config.color.error,
        description: `${bot.config.emotes.error} Veuillez entrer la description de votre profile.`
    } });
    // * Sauvegarder dans la base de donnée
    bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).assign({ description: description }).write();
    // * Réponse finale
    return message.channel.send('', { embed: {
        color: bot.config.colors.success,
        description: `${bot.config.colors.success} ${message.author} Votre profile a été mis à jour.`
    } });
};

module.exports.help = {
    name: "setdescription",
    aliases: ["setdesc"],
    description: "Change la description de votre profil. VIP seulement.",
    category: "VIP",
    usage: "<description>"
}