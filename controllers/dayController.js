const Day = require('../models/Day');
const dayService = require('../services/dayService')(Day);
const logger = require('../logger/logger');

module.exports.all_get = async (req, res) => {
    let days;

    try {
        days = await dayService.getAll();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(days);
}

module.exports.edit_put = async (req, res) => {
    let days = req.body;

    days = days.map(day => { day.date = new Date(day.date); return day; })

    try {
        await dayService.replaceAll(days);
        logger.info('PUT /days/ - Successful');
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.sendStatus(200);
}

module.exports.one_get = async (req, res) => {
    let date = req.params.day;

    date = new Date(date);

    let day;

    try {
        day = await dayService.getOne(date);
    } catch (error) {
        if(error.message === 'Day not found in the semester') {
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    res.json(day);
}