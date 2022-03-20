module.exports.create_post = (req, res) => {
    res.send('add a new lesson');
}

module.exports.one_get = (req, res) => {
    res.send('all the information about specific lesson by id');
}

module.exports.delete_delete = (req, res) => {
    res.send('remove a specific lesson by id');
}

module.exports.changeTeacher_patch = (req, res) => {
    res.send('change a teacher teaching a specific lesson');
}

module.exports.changeGroups_patch = (req, res) => {
    res.send('change a list of groups attending a specific lesson');
}

module.exports.changeTime_patch = (req, res) => {
    res.send('change a time (day and/or slot) during which a lesson is held');
}