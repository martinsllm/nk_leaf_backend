const { verifyPassword } = require('./bcrypt');
const { convertKey } = require('./token')
const UserData = require('../data/UserData');

module.exports = async (req, res, next) => {

    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({'ERROR': 'Não autorizado!'})

    const key = convertKey(authorization);

    const email = key[0];
    const senha = key[1];

    const user = await UserData.ListEmail(email)

    if(user) {
        if(await verifyPassword(senha, user.senha)){
            next();
        }
        else {
            return res.status(401).json({'ERROR': 'Senha incorreta!'})
        }
    } else {
        return res.status(404).json({'ERROR': 'Usuário não localizado!'})
    }

}