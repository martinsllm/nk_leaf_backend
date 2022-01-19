const { convertKey } = require('../config/token');
const OrderData = require('../data/OrderData');
const UserData = require('../data/UserData');

module.exports = {

    async List(req, res) {
        try {
            const { authorization } = req.headers;

            const email = convertKey(authorization);
            const user = await UserData.ListEmail(email);

            const pedidos = await OrderData.List();

            let list = [];

            for(pedido in pedidos) {
                ((pedidos[pedido].user == user.id_user) || user.atribuicao == 2) ?
                    list.push(pedidos[pedido]) : null
            }
            
            return res.json(list);
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async ListAccepts(req, res) {
        try {
            const { authorization } = req.headers;

            const email = convertKey(authorization);
            const user = await UserData.ListEmail(email)

            const pedidos = await OrderData.ListAccepts(req.params.id);

            let list = [];

            for(pedido in pedidos) {
                (pedidos[pedido].designer == user.id_user || pedidos[pedido].user == user.id_user) ?
                   list.push(pedidos[pedido]) : null
            }

            return res.json(list);
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async ListOne(req, res) {
        try {
            const { id } = req.params;

            const pedido = await OrderData.ListOne(id)

            if(!pedido) return res.status(404).json({'ERROR': 'Pedido não encontrado!'});

            return res.json(pedido);       
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Create(req, res) {
        try {
            await OrderData.Create({...req.body})

            return res.status(201).json();
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Update(req, res) {
        try {
            const { id } = req.params;

            const pedido = await OrderData.ListOne(id);

            if(!pedido) return res.status(404).json({'ERROR': 'Pedido não encontrado!'});

            await OrderData.Update(id, req.body)

            return res.status(201).json();
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;

            const pedido = await OrderData.ListOne(id);

            if(!pedido) return res.status(404).json({'ERROR': 'Pedido não encontrado!'});

            await OrderData.Delete(id);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },
}