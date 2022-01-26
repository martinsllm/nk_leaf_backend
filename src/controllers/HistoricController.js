const { convertKey } = require('../config/token');
const HistoricData = require('../data/HistoricData');
const UserData = require('../data/UserData');

module.exports = {
    async ListNoAccepts(req, res) {
        try {
            const { authorization } = req.headers;

            const email = convertKey(authorization);
            const user = await UserData.ListEmail(email);

            const pedidos = await HistoricData.ListNoAccepts();

            let list = [];

            for (pedido in pedidos) {
                ((pedidos[pedido].user == user.id_user) || user.atribuicao == 2) ?
                    list.push(pedidos[pedido]) : null
            }

            return res.json(list);
        } catch (error) {
            return res.status(500).json({ 'ERROR': error.message });
        }
    },
    async ListAccepts(req, res) {
        try {
            const { authorization } = req.headers;

            const email = convertKey(authorization);
            const user = await UserData.ListEmail(email);

            const pedidos = await HistoricData.ListAccepts();

            let list = [];

            for (pedido in pedidos) {
                ((pedidos[pedido].user == user.id_user) || user.atribuicao == 2) ?
                    list.push(pedidos[pedido]) : null
            }

            return res.json(list);
        } catch (error) {
            return res.status(500).json({ 'ERROR': error.message });
        }
    },
    async ListAcceptsAproved(req, res) {
        try {
            const { authorization } = req.headers;

            const email = convertKey(authorization);
            const user = await UserData.ListEmail(email);

            const pedidos = await HistoricData.ListAcceptsAproved();

            let list = [];

            for (pedido in pedidos) {
                ((pedidos[pedido].user == user.id_user) || user.atribuicao == 2) ?
                    list.push(pedidos[pedido]) : null
            }

            return res.json(list);
        } catch (error) {
            return res.status(500).json({ 'ERROR': error.message });
        }
    },
}