const router = require('express').Router();

const AddressController = require('../../controllers/AddressController');
const auth = require('../../config/auth');

router.post('/', AddressController.Create);

router.use(auth);

router.get('/', AddressController.List);

router.get('/:id', AddressController.ListOne);



router.put('/:id', AddressController.Update);

router.delete('/:id', AddressController.Delete);

module.exports = router;