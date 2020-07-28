class Random {

    /**
     * Génère aléatoirement un nombre entre deux donnés.
     * 
     * @param {Number} min 
     * @param {Number} max 
     */
    static between(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Génère aléatoirement un ID spécifique avec une taille donnée (de défaut: 13)
     * 
     * @param {Number} length 
     */
    static generateID(length = 13) {
        var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+-_.@".split("");
        let result = "";
        for (let i = 0; i < length; i++) {
            result += possibilities[Math.floor(Math.random() * possibilities.length)];
        }
        return result;
    }
}

module.exports = Random;