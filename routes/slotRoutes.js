const slotController = require('../controllers/slotController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/', slotController.all_get);
router.put('/', authMiddleware.check, slotController.edit_put);
router.get('/:slot/', slotController.one_get);

module.exports = router;