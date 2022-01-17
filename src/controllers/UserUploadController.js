const UserUploadData = require('../data/UserUploadData');

module.exports = {
    async List(req, res) {
        try {
            const uploads = await UserUploadData.List();

            return res.json(uploads);
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async ListOne(req, res) {
        try {
            const { id } = req.params;

            const upload = await UserUploadData.ListOne(id)

            if(!upload) return res.status(404).json({'ERROR': 'Foto não encontrada!'})

            return res.json(upload);
            
        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },

    async Upload(req, res) {
        try {
            const { id } = req.params;

            const url = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`

            await UserUploadData.Create(id, url)

            return res.status(201).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    },


    async Delete(req, res) {
        try {
            const { id } = req.params;

            const upload = await UserUploadData.ListOne(id)

            if(!upload) return res.status(404).json({'ERROR': 'Foto não encontrada!'})

            await UserUploadData.Delete(id);

            return res.status(204).json();

        } catch (error) {
            return res.status(500).json({'ERROR': error.message});
        }
    }
}