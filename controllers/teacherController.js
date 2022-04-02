const Teacher = require('../models/Teacher');
const Lesson = require('../models/Lesson');
const Slot = require('../models/Slot');
const Day = require('../models/Day');
const teacherService = require('../services/teacherService')(Teacher, Lesson, Slot, Day);

module.exports.all_get = async (req, res) => {
    const teachers = await teacherService.getAll();

    res.json(teachers);
}

module.exports.create_post = async (req, res) => {
    const teacher = req.body;

    await teacherService.createOne(teacher);

    res.sendStatus(200);
}

module.exports.weekSchedule_get = async (req, res) => {
    const teacherId = req.params.teacherId;

    const schedule = await teacherService.getSchedule(teacherId);

    res.json(schedule);
}

module.exports.edit_put = async (req, res) => {
    const teacherId = req.params.teacherId;
    const teacher = req.body;

    await teacherService.editOne(teacherId, teacher);

    res.sendStatus(200);
}

module.exports.delete_delete = async (req, res) => {
    const teacherId = req.params.teacherId;

    await teacherService.deleteOne(teacherId);

    res.sendStatus(200);
}

module.exports.daySchedule_get = async (req, res) => {
    let { teacherId, day } = req.params;

    day = new Date(day);

    const schedule = await teacherService.getSchedule(teacherId, day);

    res.json(schedule);
}

module.exports.lessonSchedule_get = async (req, res) => {
    let { teacherId, day, lesson } = req.params;

    day = new Date(day);
    lesson = Number(lesson);

    const schedule = await teacherService.getSchedule(teacherId, day, lesson);

    res.json(schedule);
}

module.exports.timeSchedule_get = async (req, res) => {
    let { teacherId, day, time } = req.params;

    day = new Date(day);

    const schedule = await teacherService.getSchedule(teacherId, day, undefined, time);

    res.json(schedule);
}

module.exports.remainingSchedule_get = async (req, res) => {
    const teacherId = req.params.teacherId;

    const schedule = await teacherService.getRemainingSchedule(teacherId);

    res.json(schedule);
}