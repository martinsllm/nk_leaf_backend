const { generateHash } = require('../config/bcrypt');
const { generateKey, convertKey } = require('../config/token');
const mailer = require('../config/mailer');
const UserData = require('../data/UserData');

module.exports = {

    async Login(req, res) {
        try {
            const { email, senha } = req.body;

            return res.json({token: generateKey({email, senha})});
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async SendEmail(req, res) {
        try {
            const { email } = req.body;

            const user = await UserData.ListEmail(email)

            if(!user) return res.status(404).json({'ERROR': 'Usuário não localizado!'})

            mailer.sendMail({
                from: process.env.APP_MAILER_USER,
                to: email,
                subject: "Alteração de senha",
                html: "<div> <p>Esqueceu sua senha? Sem problemas, recupere utilizando o token disponibilizado abaixo: </p> </hr>" + Buffer.from(email + ':' + user.senha).toString('base64') + "</div>"
            });

            return res.status(201).json();
            
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async ChangePassword(req, res) {
        try {
            const { senha, authorization } = req.body;

            if(!authorization) return res.status(401).json({'ERROR': 'Token inválido!'})

            const key = convertKey(authorization);
            const email = key[0];

            const user = await UserData.ListEmail(email)

            if(!user) return res.status(404).json({'ERROR': 'Usuário não localizado!'})

            if(senha === "") return res.status(401).json({'ERROR': 'Valor de senha inválido!'})

            await UserData.UpdatePassword(email, senha)

            return res.status(201).json();
            
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    }

}