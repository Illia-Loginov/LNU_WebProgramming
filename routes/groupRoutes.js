const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/', groupController.all_get);
router.post('/', authMiddleware.check, groupController.create_post);
router.get('/:groupName/', groupController.weekSchedule_get);
router.delete('/:groupName/', authMiddleware.check, groupController.delete_delete);
router.get('/:groupName/days/:day/', groupController.daySchedule_get);
router.get('/:groupName/days/:day/lessons/:lesson/', groupController.lessonSchedule_get);
router.get('/:groupName/days/:day/time/:time/', groupController.timeSchedule_get);
router.get('/:groupName/fromnow/', groupController.remainingSchedule_get);

module.exports = router;