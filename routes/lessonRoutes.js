const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/', authMiddleware.check, lessonController.create_post);
router.get('/:lessonId/', lessonController.one_get);
router.delete('/:lessonId/', authMiddleware.check, lessonController.delete_delete);
router.patch('/:lessonId/', authMiddleware.check, lessonController.edit_patch);

module.exports = router;