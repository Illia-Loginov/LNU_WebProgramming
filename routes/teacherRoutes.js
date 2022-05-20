const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/', teacherController.all_get);
router.post('/', authMiddleware.check, teacherController.create_post);
router.get('/:teacherId/', teacherController.weekSchedule_get);
router.put('/:teacherId/', authMiddleware.check, teacherController.edit_put);
router.delete('/:teacherId/', authMiddleware.check, teacherController.delete_delete);
router.get('/:teacherId/days/:day/', teacherController.daySchedule_get);
router.get('/:teacherId/days/:day/lessons/:lesson/', teacherController.lessonSchedule_get);
router.get('/:teacherId/days/:day/time/:time/', teacherController.timeSchedule_get);
router.get('/:teacherId/fromnow/', teacherController.remainingSchedule_get);

module.exports = router;