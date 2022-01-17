const router = require('express').Router();

const multer = require('multer');
const upload = multer({});

const UserUploadController = require('../../controllers/UserUploadController');
const auth = require('../../config/auth');

router.use(auth);

router.get('/', UserUploadController.List)

router.get('/:id', UserUploadController.ListOne)

router.post('/:id', upload.single('image'), UserUploadController.Upload);

router.delete('/:id', UserUploadController.Delete)

module.exports = router;