const lessonController = require('../controllers/lessonController');

const router = require('express').Router();

router.post('/', lessonController.create_post);
router.get('/:lessonId/', lessonController.one_get);
router.delete('/:lessonId/', lessonController.delete_delete);
router.patch('/:lessonId/', lessonController.edit_patch);

module.exports = router;