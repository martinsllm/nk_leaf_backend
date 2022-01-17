const OrderData = require('../data/OrderData');

module.exports = {

    async List(req, res) {
        try {
            const pedidos = await OrderData.List();

            return res.json(pedidos);
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