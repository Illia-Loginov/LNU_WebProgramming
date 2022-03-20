module.exports.all_get = (req, res) => {
    res.send('list of all days in a semester, specifying whether they are part of the week A, week B or weekends');
}

module.exports.edit_put = (req, res) => {
    res.send('change details about days in the semester');
}

module.exports.one_get = (req, res) => {
    res.send('whether a particular day is a part of the week A, week B or a weekend');
}