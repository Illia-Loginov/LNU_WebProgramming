const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    teacher: { type: mongoose.Types.ObjectId, ref: 'teacher', required: true },
    groups: [{ type: String }],
    week: { type: String, required: true },
    day: { type: Number, required: true },
    slot: { type: Number, required: true }
});

const Lesson = mongoose.model('lesson', lessonSchema);
module.exports = Lesson;