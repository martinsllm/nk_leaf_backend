const router = require('express').Router();

const multer = require('multer');
const upload = multer({});

const OrderUploadController = require('../../controllers/OrderUploadController');
const auth = require('../../config/auth');

router.use(auth);

router.get('/', OrderUploadController.List)

router.get('/:id', OrderUploadController.ListOne)

router.post('/:id', upload.single('image'), OrderUploadController.Upload);

router.delete('/:id', OrderUploadController.Delete)

module.exports = router;