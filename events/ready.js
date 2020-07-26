const { Client } = require('discord.js'); // !important

/**
 * Événement ready
 * 
 * @param {Client} bot 
 */
module.exports = (bot) => {
    bot.user.setActivity(`Modérer le serveur Weyzer.`, { type: "PLAYING" });
}