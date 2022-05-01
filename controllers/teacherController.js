const Teacher = require('../models/Teacher');
const Lesson = require('../models/Lesson');
const Slot = require('../models/Slot');
const Day = require('../models/Day');
const teacherService = require('../services/teacherService')(Teacher, Lesson, Slot, Day);
const logger = require('../logger/logger');

module.exports.all_get = async (req, res) => {
    let teachers;

    try {
        teachers = await teacherService.getAll();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(teachers);
}

module.exports.create_post = async (req, res) => {
    const teacher = req.body;

    try {
        await teacherService.createOne(teacher);
        logger.info('POST /teachers/ - Successful');
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(200);
}

module.exports.weekSchedule_get = async (req, res) => {
    const teacherId = req.params.teacherId;

    let schedule;

    try {
        schedule = await teacherService.getSchedule(teacherId);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.edit_put = async (req, res) => {
    const teacherId = req.params.teacherId;
    const teacher = req.body;

    try {
        await teacherService.editOne(teacherId, teacher);
        logger.info('PUT /teachers/:teacherId - Successful');
    } catch (error) {
        if(error.message === 'Teacher not found') {
            logger.info('PUT /teachers/:teacherId - Unsuccessful (teacher not found)');
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
}

module.exports.delete_delete = async (req, res) => {
    const teacherId = req.params.teacherId;

    try {
        await teacherService.deleteOne(teacherId);
        logger.info('DELETE /teachers/:teacherId - Successful');
    } catch (error) {
        if(error.message === 'Teacher not found') {
            logger.info('DELETE /teachers/:teacherId - Unsuccessful (teacher not found)');
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
}

module.exports.daySchedule_get = async (req, res) => {
    let { teacherId, day } = req.params;

    day = new Date(day);

    let schedule;
    
    try {
        schedule = await teacherService.getSchedule(teacherId, day);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.lessonSchedule_get = async (req, res) => {
    let { teacherId, day, lesson } = req.params;

    day = new Date(day);
    lesson = Number(lesson);

    let schedule;

    try {
        schedule = await teacherService.getSchedule(teacherId, day, lesson);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.timeSchedule_get = async (req, res) => {
    let { teacherId, day, time } = req.params;

    day = new Date(day);

    let schedule;

    try {
        schedule = await teacherService.getSchedule(teacherId, day, undefined, time);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.remainingSchedule_get = async (req, res) => {
    const teacherId = req.params.teacherId;

    let schedule;

    try {
        schedule = await teacherService.getRemainingSchedule(teacherId);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}