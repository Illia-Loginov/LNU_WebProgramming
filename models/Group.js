const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Group = mongoose.model('group', groupSchema);
module.exports = Group;