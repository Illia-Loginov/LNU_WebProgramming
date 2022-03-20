module.exports.all_get = (req, res) => {
    res.send('list of all groups');
}

module.exports.create_post = (req, res) => {
    res.send('add a new group');
}

module.exports.weekSchedule_get = (req, res) => {
    res.send('schedule of a particular group for the whole week');
}

module.exports.edit_put = (req, res) => {
    res.send('change the details of a particular group');
}

module.exports.delete_delete = (req, res) => {
    res.send('remove a particular group');
}

module.exports.daySchedule_get = (req, res) => {
    res.send('schedule for a particular date or day of the week');
}

module.exports.lessonSchedule_get = (req, res) => {
    res.send('group\'s schedule for a specific lesson');
}

module.exports.timeSchedule_get = (req, res) => {
    res.send('group\'s schedule for a specific time');
}

module.exports.remainingSchedule_get = (req, res) => {
    res.send('lessons left for a group for today');
}