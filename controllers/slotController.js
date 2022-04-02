const Slot = require('../models/Slot');
const slotService = require('../services/slotService')(Slot);

module.exports.all_get = async (req, res) => {
    const slots = await slotService.getAll();

    res.json(slots);
}

module.exports.edit_put = async (req, res) => {
    const slots = req.body;

    await slotService.replaceAll(slots);

    res.sendStatus(200);
}

module.exports.one_get = async (req, res) => {
    let slotNumber = req.params.slot;

    slotNumber = Number(slotNumber);

    const slot = await slotService.getOne(slotNumber);

    res.json(slot);
}