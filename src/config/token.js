module.exports = {

    generateKey: (params = {}) => {
        const { email, senha } = params;
        return Buffer.from(email + ':' + senha).toString('base64');
    },

    convertKey: (params) => {
        return Buffer.from(params, 'base64').toString().split(':')
    }
}