const router = require('express').Router();

const OrderController = require('../../controllers/OrderController');
const auth = require('../../config/auth');

router.get('/:id', OrderController.ListOne);

router.use(auth);

router.get('/', OrderController.List);



router.post('/', OrderController.Create);

router.put('/:id', OrderController.Update);

router.delete('/:id', OrderController.Delete);

module.exports = router;