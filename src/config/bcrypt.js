const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    generateHash: async (password) => {
        const hash = await bcrypt.hash(password, saltRounds).then(hash => {
            return hash;
        });

        return hash;
    },

    verifyPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }
}