const Group = require('../models/Group');
const Lesson = require('../models/Lesson');
const Slot = require('../models/Slot');
const Day = require('../models/Day');
const groupService = require('../services/groupService')(Group, Lesson, Slot, Day);

module.exports.all_get = async (req, res) => {
    let groups;

    try {
        groups = await groupService.getAll();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(groups);
}

module.exports.create_post = async (req, res) => {
    const group = req.body;

    try {
        await groupService.createOne(group);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(200);
}

module.exports.weekSchedule_get = async (req, res) => {
    const groupName = req.params.groupName;

    let schedule;

    try {
        schedule = await groupService.getSchedule(groupName);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.edit_put = async (req, res) => {
    const groupName = req.params.groupName;
    const group = req.body;

    try {
        await groupService.editOne(groupName, group);
    } catch (error) {
        if(error.message === 'Group not found') {
            return res.status(404).json({ error: error.message });
        } else {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
}

module.exports.delete_delete = async (req, res) => {
    const groupName = req.params.groupName;

    try {
        await groupService.deleteOne(groupName);
    } catch (error) {
        if(error.message === 'Group not found') {
            return res.status(404).json({ error: error.message });
        } else {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
}

module.exports.daySchedule_get = async (req, res) => {
    let { groupName, day } = req.params;

    day = new Date(day);

    let schedule;
    
    try {
        schedule = await groupService.getSchedule(groupName, day);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.lessonSchedule_get = async (req, res) => {
    let { groupName, day, lesson } = req.params;

    day = new Date(day);
    lesson = Number(lesson);

    let schedule;

    try {
        schedule = await groupService.getSchedule(groupName, day, lesson);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.timeSchedule_get = async (req, res) => {
    let { groupName, day, time } = req.params;

    day = new Date(day);

    let schedule;

    try {
        schedule = await groupService.getSchedule(groupName, day, undefined, time);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}

module.exports.remainingSchedule_get = async (req, res) => {
    const groupName = req.params.groupName;

    let schedule;

    try {
        schedule = await groupService.getRemainingSchedule(groupName);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(schedule);
}