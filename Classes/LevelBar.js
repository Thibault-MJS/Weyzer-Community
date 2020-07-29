class LevelBar {

    /**
     * Récupère le nombre d'emote de couleur.
     * 
     * @param {Number} percents 
     */
    static getNumberOfEmotesXP(percents) {
        let countEmoteXP = 0;
        if (percents >= 10) countEmoteXP += 1;
        if (percents >= 20) countEmoteXP += 1;
        if (percents >= 30) countEmoteXP += 1;
        if (percents >= 40) countEmoteXP += 1;
        if (percents >= 50) countEmoteXP += 1;
        if (percents >= 60) countEmoteXP += 1;
        if (percents >= 70) countEmoteXP += 1;
        if (percents >= 80) countEmoteXP += 1;
        if (percents >= 90) countEmoteXP += 1;
        if (percents >= 99) countEmoteXP += 1;
        return countEmoteXP;
    }

    /**
     * Récupère la barre d'xp complète.
     * 
     * @param {String} emoteColored 
     * @param {String} emoteBlank 
     * @param {Number} countEmoteXP 
     */
    static doLevelBar (emoteColored, emoteBlank, countEmoteXP) {
        let total = 10;
        let numEmotesBlank = total - countEmoteXP;
        if (numEmotesBlank === 0) return emoteColored.repeat(10);
        else if (numEmotesBlank === 10) return emoteBlank.repeat(10);
        return emoteColored.repeat(countEmoteXP) + emoteBlank.repeat(numEmotesBlank);
    }
}

module.exports = LevelBar;