const Slot = require('../models/Slot');
const slotService = require('../services/slotService')(Slot);
const logger = require('../logger/logger');

module.exports.all_get = async (req, res) => {
    let slots;

    try {
        slots = await slotService.getAll();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(slots);
}

module.exports.edit_put = async (req, res) => {
    const slots = req.body;

    try {
        await slotService.replaceAll(slots);
        logger.info('PUT /slots/ - Successful');
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.sendStatus(200);
}

module.exports.one_get = async (req, res) => {
    let slotNumber = req.params.slot;

    slotNumber = Number(slotNumber);

    let slot;

    try {
        slot = await slotService.getOne(slotNumber);
    } catch (error) {
        if(error.message === 'Slot not found') {
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    res.json(slot);
}