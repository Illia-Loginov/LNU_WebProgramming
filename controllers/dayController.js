const Day = require('../models/Day');
const dayService = require('../services/dayService')(Day);

module.exports.all_get = async (req, res) => {
    const days = await dayService.getAll();

    res.json(days);
}

module.exports.edit_put = async (req, res) => {
    let days = req.body;

    days = days.map(day => { day.date = new Date(day.date); return day; })

    await dayService.replaceAll(days);

    res.sendStatus(200);
}

module.exports.one_get = async (req, res) => {
    let date = req.params.day;

    date = new Date(date);

    const day = await dayService.getOne(date);

    res.json(day);
}