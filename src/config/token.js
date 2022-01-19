module.exports = {

    generateKey: (params = {}) => {
        const { email } = params;
        return Buffer.from(email).toString('base64');
    },

    convertKey: (params) => {
        return Buffer.from(params, 'base64').toString();
    }
}