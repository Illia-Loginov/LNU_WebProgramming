const dayController = require('../controllers/dayController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/', dayController.all_get);
router.put('/', authMiddleware.check, dayController.edit_put);
router.get('/:day/', dayController.one_get);

module.exports = router;