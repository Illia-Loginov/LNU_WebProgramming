const slotController = require('../controllers/slotController');

const router = require('express').Router();

router.get('/', slotController.all_get);
router.put('/', slotController.edit_put);
router.get('/:slot/', slotController.one_get);

module.exports = router;