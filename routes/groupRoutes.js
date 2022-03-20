const groupController = require('../controllers/groupController');

const router = require('express').Router();

router.get('/', groupController.all_get);
router.post('/', groupController.create_post);
router.get('/:groupId/', groupController.weekSchedule_get);
router.put('/:groupId/', groupController.edit_put);
router.delete('/:groupId/', groupController.delete_delete);
router.get('/:groupId/days/:day/', groupController.daySchedule_get);
router.get('/:groupId/days/:day/lessons/:lesson/', groupController.lessonSchedule_get);
router.get('/:groupId/days/:day/time/:time/', groupController.timeSchedule_get);
router.get('/:groupId/fromnow/', groupController.remainingSchedule_get);

module.exports = router;