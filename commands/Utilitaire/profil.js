const { Client, Message, MessageEmbed } = require('discord.js'); // !important
const LevelBar = require('../../Classes/LevelBar'); // !important

/**
 * Commande profil
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = (bot, message, args) => {
    if (!bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).value()) return message.reply('', { embed: {
        color: bot.config.colors.error,
        description: `${bot.config.emotes.error} Vous n'avez aucun profile.`
    } });
    // * Définit la barre d'xp
    var profil = bot.db.get('profil').filter({ guild: message.guild.id, user: message.author.id }).find('user').value();
    let emote = [];
    if (profil.emote === null) emote.push(bot.config.emotes.blue, bot.config.emotes.blank);
    else emote.push(profil.emote, bot.config.emotes.blank);
    let percents = Math.floor((profil.xp/profil.but) *100);
    let countEmoteXP = LevelBar.getNumberOfEmotesXP(percents);
    let bar = LevelBar.doLevelBar(emote[0], emote[1], countEmoteXP);
    // * Réponse finale
    let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`Niveau **${profil.lvl}** (\`${profil.xp}\`/\`${profil.but}\`)\n\n${bar}`)
        .addField("❯ **Monnaie**", `\`\`\`js\n${profil.money}$\`\`\``)
        .setColor((profil.color !== null) ? profil.color : bot.config.colors.primary)
        .setFooter(`Weyzer Community © All rights reserved.`, bot.user.displayAvatarURL())
        .setTimestamp();
    if (profil.description !== null) embed.addField("❯ **Description**", `\`\`\`js\n${profil.description}$\`\`\``);
    message.channel.send(embed);
}

module.exports.help = {
    name: "profil",
    description: "Affiche votre profile Weyzer.",
    aliases: ["profile"],
    category: "Utilitaire"
}