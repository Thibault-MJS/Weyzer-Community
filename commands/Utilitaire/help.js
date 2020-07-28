const { Client, Message, MessageEmbed } = require('discord.js'); // !important
const { readdirSync } = require('fs'); // !important

/**
 * Commande help
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = (bot, message, args) => {
    // * Création du embed de réponse finale
    var embed = new MessageEmbed()
        .setColor(bot.config.colors.primary)
        .setFooter(`Weyzer Community © All rights reserved.`, bot.user.displayAvatarURL())
        .setTimestamp();
    // * Analyse de la commande
    if (args[0]) {
        let command = args[0];
        let cmd;

        if (bot.commands.has(command)) cmd = bot.commands.get(command);
        else if (bot.aliases.has(command)) cmd = bot.commands.get(bot.aliases.get(command));

        if (!cmd) return message.reply('', {
            embed: {
                color: bot.config.colors.error,
                description: `${bot.config.emotes.error} Commande inexistante. Veuillez taper la commande \`${bot.config.prefix}help\` pour afficher la liste de mes commandes.`
            }
        });

        command = cmd.help;
        embed.setAuthor(`Commande ${command.name}`, message.author.displayAvatarURL())
            .addField("❯ **Usage**", `\`\`\`${command.usage ? `${bot.config.prefix}${command.name} ${command.usage}` : `${bot.config.prefix}${command.name}`}\`\`\``)
            .addField("❯ **Description**", `\`\`\`${command.description || "Aucune description."}\`\`\``)
            .addField("❯ **Alias(es)**", `\`\`\`${command.aliases ? command.aliases.join(', ') : "Aucun alias."}\`\`\``, true)
            .addField("❯ **Catégorie**", `\`\`\`fix\n${command.category}\`\`\``, true);

        return message.channel.send(embed);
    }
    // * Ajouter une description au message de réponse finale
    embed.setDescription(`Le prefix de \`${message.guild.name}\` est \`${bot.config.prefix}\`.\nPour exécuter une commande faites: \`${bot.config.prefix}commande\`.`)
        .setAuthor(`Liste des commande disponibles`, message.author.displayAvatarURL());
    // ! Récupérer chaque commandes de chaque catégorie et les associées en plusieurs champs.
    readdirSync(bot.config.dirs.commands).forEach(category => {
        var dir = bot.commands.filter(cmd => cmd.help.category.toLowerCase() === category.toLowerCase());
        var capitilise = category.slice(0,1).toUpperCase() + category.slice(1).toLowerCase();

        if (dir.size === 0) return;
        embed.addField(`❯ **${capitilise}**`, dir.map(cmd => `\`${cmd.help.name}\``).join(', '));
    });
    // * Envoyer le résultat final.
    return message.channel.send(embed);
}

module.exports.help = {
    name: "help",
    description: "Affiche un menu d'aide personnalisé.",
    aliases: ["h"],
    category: "Utilitaire",
    usage: "[commande]"
}