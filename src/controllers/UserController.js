const UserData = require('../data/UserData');

module.exports = {

    async List(req, res) {
        try {
            const users = await UserData.List();

            return res.json(users);
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async ListOne(req, res) {
        try {
            const { id } = req.params;

            const user = await UserData.ListOne(id);

            if(!user) return res.status(404).json({ERROR: 'Usuário não localizado!'});

            return res.json(user);
            
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Create(req, res) {
        try {
            const { nome_completo, email, senha } = req.body;

            const user = await UserData.ListFirst({nome_completo, email})

            if(user) return res.status(409).json({ERROR: 'Usuário já cadastrado com essas credenciais!'});

            if(nome_completo === "" || email === "") return res.status(400).json({'ERROR': 'Um ou mais campos em branco!'})
            
            await UserData.Create({...req.body})

            return res.status(201).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { nome_completo, email } = req.body;

            const user = await UserData.ListOne(id);

            if(!user) return res.status(404).json({ERROR: 'Usuário não localizado!'});

            if(nome_completo === "" || email === "") return res.status(400).json({'ERROR': 'Um ou mais campos em branco!'})

            await UserData.Update(id, req.body);

            return res.status(201).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;

            const user = await UserData.ListOne(id);

            if(!user) return res.status(404).json({ERROR: 'Usuário não localizado!'});

            await UserData.Delete(id)

            return res.status(204).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    }
}