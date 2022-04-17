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

module.exports.edit_patch = async (req, res) => {
    const lessonId = req.params.lessonId;
    const newValues = req.body;

    for(let key of Object.keys(newValues)) {
        if(!['teacher', 'groups', 'slot', 'day', 'week'].includes(key)) {
            return res.status(400).json({ error: `No such property as ${key}`});
        } else if(newValues[key] == null || newValues[key] == undefined) {
            return res.status(400).json({ error: `${key} is null or undefined`});
        }
    }

    await lessonService.editOne(lessonId, newValues);

    res.sendStatus(200);
}