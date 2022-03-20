const dayController = require('../controllers/dayController');

const router = require('express').Router();

router.get('/', dayController.all_get);
router.put('/', dayController.edit_put);
router.get('/:day/', dayController.one_get);

module.exports = router;