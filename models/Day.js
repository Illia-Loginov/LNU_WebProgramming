const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true }
})

const Day = mongoose.model('day', daySchema);
module.exports = Day;