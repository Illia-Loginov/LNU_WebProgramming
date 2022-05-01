const Lesson = require('../models/Lesson');
const lessonService = require('../services/lessonService')(Lesson);
const logger = require('../logger/logger');

module.exports.create_post = async (req, res) => {
    const lesson = req.body;

    try {
        await lessonService.createOne(lesson);
        logger.info('POST /lessons/ - Successful');
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(200);
}

module.exports.one_get = async (req, res) => {
    const lessonId = req.params.lessonId;

    let lesson;

    try {
        lesson = await lessonService.getOne(lessonId);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    if(!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
    } else {
        return res.json(lesson);
    }
}

module.exports.delete_delete = async (req, res) => {
    const lessonId = req.params.lessonId;

    try {
        await lessonService.deleteOne(lessonId);
        logger.info('DELETE /lessons/:lessonId - Successful');
    } catch (error) {
        if(error.message === 'Lesson not found') {
            logger.info('DELETE /lessons/:lessonId - Unsuccessful (lesson not found)');
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
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

    try {
        await lessonService.editOne(lessonId, newValues);
        logger.info('PATCH /lessons/:lessonId - Successful');
    } catch (error) {
        if(error.message === 'Lesson not found') {
            logger.info('PATCH /lessons/:lessonId - Unsuccessful (lesson not found)');
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
}