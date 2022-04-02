const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true }
})

const Slot = mongoose.model('slot', slotSchema);
module.exports = Slot;