const router = require('express').Router();

const SessionController = require('../controllers/SessionController');

//Main
router.post('/login', SessionController.Login)
router.post('/sendEmail', SessionController.SendEmail)
router.post('/changePassword', SessionController.ChangePassword)

router.use('/address', require('./routes/address'));
router.use('/order', require('./routes/order'));
router.use('/order-upload', require('./routes/order-upload'));
router.use('/user', require('./routes/user'));
router.use('/user-upload', require('./routes/user-upload'));

module.exports = router;

