const Lesson = require('../models/Lesson');
const lessonService = require('../services/lessonService')(Lesson);

module.exports.create_post = async (req, res) => {
    const lesson = req.body;

    await lessonService.createOne(lesson);

    res.sendStatus(200);
}

module.exports.one_get = async (req, res) => {
    const lessonId = req.params.lessonId;

    const lesson = await lessonService.getOne(lessonId);

    res.json(lesson);
}

module.exports.delete_delete = async (req, res) => {
    const lessonId = req.params.lessonId;

    await lessonService.deleteOne(lessonId);

    res.sendStatus(200);
}

module.exports.changeTeacher_patch = async (req, res) => {
    const lessonId = req.params.lessonId;
    const teacher = req.body;

    await lessonService.editOne(lessonId, { teacher });

    res.sendStatus(200);
}

module.exports.changeGroups_patch = async (req, res) => {
    const lessonId = req.params.lessonId;
    const groups = req.body;

    await lessonService.editOne(lessonId, { groups });

    res.sendStatus(200);
}

module.exports.changeTime_patch = async (req, res) => {
    const lessonId = req.params.lessonId;
    const { lessonSlot, day, week } = req.body;

    await lessonService.editOne(lessonId, { lessonSlot, day, week });

    res.sendStatus(200);
}