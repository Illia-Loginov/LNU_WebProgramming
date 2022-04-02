const Group = require('../models/Group');
const Lesson = require('../models/Lesson');
const Slot = require('../models/Slot');
const Day = require('../models/Day');
const groupService = require('../services/groupService')(Group, Lesson, Slot, Day);

module.exports.all_get = async (req, res) => {
    const groups = await groupService.getAll();

    res.json(groups);
}

module.exports.create_post = async (req, res) => {
    const group = req.body;

    await groupService.createOne(group);

    res.sendStatus(200);
}

module.exports.weekSchedule_get = async (req, res) => {
    const groupName = req.params.groupName;

    const schedule = await groupService.getSchedule(groupName);

    res.json(schedule);
}

module.exports.edit_put = async (req, res) => {
    const groupName = req.params.groupName;
    const group = req.body;

    await groupService.editOne(groupName, group);

    res.sendStatus(200);
}

module.exports.delete_delete = async (req, res) => {
    const groupName = req.params.groupName;

    await groupService.deleteOne(groupName);

    res.sendStatus(200);
}

module.exports.daySchedule_get = async (req, res) => {
    let { groupName, day } = req.params;

    day = new Date(day);

    const schedule = await groupService.getSchedule(groupName, day);

    res.json(schedule);
}

module.exports.lessonSchedule_get = async (req, res) => {
    let { groupName, day, lesson } = req.params;

    day = new Date(day);
    lesson = Number(lesson);

    const schedule = await groupService.getSchedule(groupName, day, lesson);

    res.json(schedule);
}

module.exports.timeSchedule_get = async (req, res) => {
    let { groupName, day, time } = req.params;

    day = new Date(day);

    const schedule = await groupService.getSchedule(groupName, day, undefined, time);

    res.json(schedule);
}

module.exports.remainingSchedule_get = async (req, res) => {
    const groupName = req.params.groupName;

    const schedule = await groupService.getRemainingSchedule(groupName);

    res.json(schedule);
}