const router = require('express').Router();

const UserController = require('../../controllers/UserController');
const auth = require('../../config/auth');

router.post('/', UserController.Create);

router.use(auth);

router.get('/', UserController.List);

router.get('/:id', UserController.ListOne);

router.put('/:id', UserController.Update);

router.delete('/:id', UserController.Delete);

module.exports = router;