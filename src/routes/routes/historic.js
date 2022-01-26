const router = require('express').Router();

const HistoricController = require('../../controllers/HistoricController');
const auth = require('../../config/auth');



router.use(auth);

router.get('/aproved', HistoricController.ListAcceptsAproved);
router.get('/not-aproved', HistoricController.ListNoAccepts);
router.get('/accepts', HistoricController.ListAccepts);




module.exports = router;