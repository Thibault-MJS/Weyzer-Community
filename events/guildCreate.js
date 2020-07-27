const { Client, Guild } = require('discord.js'); // !important

/**
 * Événement guildCreate.
 * 
 * @param {Client} bot 
 * @param {Guild} guild 
 */
module.exports = (bot, guild) => {
    // ! Vérifier si le serveur fait partie des serveurs autorisés.
    if (!bot.config.guilds.includes(guild.id)) return guild.leave();
}