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
    let member = message.mentions.members.first();
    if (!member) {
        if (!bot.db.get('profil').find({ guild: message.guild.id, user: message.author.id }).value()) return message.reply('', { embed: {
            color: bot.config.colors.error,
            description: `${bot.config.emotes.error} Vous n'avez aucun profile.`
        } });
        member = message.member;
    } else {
        if (!bot.db.get('profil').find({ guild: message.guild.id, user: member.user.id }).value()) return message.reply('', { embed: {
            color: bot.config.colors.error,
            description: `${bot.config.emotes.error} ${member.user} n'a aucun profile.`
        } });
    }
    // * Définit la barre d'xp
    var profil = bot.db.get('profil').filter({ guild: message.guild.id, user: member.user.id }).find('user').value();
    let emote = [];
    if (profil.emote === null) emote.push(bot.config.emotes.blue, bot.config.emotes.blank);
    else emote.push(profil.emote, bot.config.emotes.blank);
    let percents = Math.floor((profil.xp/profil.but) *100);
    let countEmoteXP = LevelBar.getNumberOfEmotesXP(percents);
    let bar = LevelBar.doLevelBar(emote[0], emote[1], countEmoteXP);
    // * Réponse finale
    let embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`Niveau **${profil.lvl}** (\`${profil.xp}\`/\`${profil.but}\`)\n\n${bar}`)
        .addField("❯ **Monnaie**", `\`\`\`js\n${profil.money}$\`\`\``)
        .addField("❯ **Likes**", `\`\`\`js\n${profil.likes} likes\`\`\``)
        .setColor((profil.color !== null) ? profil.color : bot.config.colors.primary)
        .setFooter(`Weyzer Community © All rights reserved.`, bot.user.displayAvatarURL())
        .setTimestamp();
    if (profil.description !== null) embed.addField("❯ **Description**", `${profil.description}`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "profil",
    description: "Affiche votre profile Weyzer.",
    aliases: ["profile"],
    category: "Utilitaire"
}