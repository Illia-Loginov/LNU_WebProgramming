const groupController = require('../controllers/groupController');

const router = require('express').Router();

router.get('/', groupController.all_get);
router.post('/', groupController.create_post);
router.get('/:groupName/', groupController.weekSchedule_get);
router.put('/:groupName/', groupController.edit_put);
router.delete('/:groupName/', groupController.delete_delete);
router.get('/:groupName/days/:day/', groupController.daySchedule_get);
router.get('/:groupName/days/:day/lessons/:lesson/', groupController.lessonSchedule_get);
router.get('/:groupName/days/:day/time/:time/', groupController.timeSchedule_get);
router.get('/:groupName/fromnow/', groupController.remainingSchedule_get);

module.exports = router;