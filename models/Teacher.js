const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: { type: String, required: true }
})

const Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;