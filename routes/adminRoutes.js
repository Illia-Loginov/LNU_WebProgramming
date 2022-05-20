const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/', authMiddleware.check, adminController.all_get);
router.post('/', authMiddleware.check, adminController.create_post);
router.post('/login/', adminController.login_post);
router.delete('/', authMiddleware.check, adminController.delete_delete);

module.exports = router;