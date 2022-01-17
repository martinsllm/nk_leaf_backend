const AddressData = require('../data/AddressData');

module.exports = {

    async List(req, res) {
        try {
            const addresses = await AddressData.List();
    
            return res.json(addresses);
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async ListOne(req, res) {
        try {
            const { id } = req.params;

            const address = await AddressData.ListOne(id)

            if(!address) return res.status(404).json({ERROR: 'Endereço não localizado!'});
    
            return res.json(address);

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Create(req, res) {
        try {
            const { rua, cidade, estado, cep, numero } = req.body;

            const address = await AddressData.ListFirst({...req.body})

            if(address) return res.status(409).json({'ERROR': 'Endereço já registrado!'})

            if(rua === "" || cidade === "" || estado === "" || cep === "" || numero === "")
                return res.status(400).json({'ERROR': 'Um ou mais campos vazios!'})
            
            await AddressData.Create({...req.body})
    
            return res.status(201).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { rua, cidade, estado, cep, numero } = req.body;

            const address = await AddressData.ListOne(id);

            if(!address) return res.status(404).json({ERROR: 'Endereço não localizado!'});

            if(rua === "" || cidade === "" || estado === "" || cep === "" || numero === "")
                return res.status(400).json({'ERROR': 'Um ou mais campos vazios!'})
            
            await AddressData.Update(id, req.body)

            return res.status(201).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;

            const address = await AddressData.ListOne(id);

            if(!address) return res.status(404).json({ERROR: 'Endereço não localizado!'});

            await AddressData.Delete(id);

            return res.status(204).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    }
}