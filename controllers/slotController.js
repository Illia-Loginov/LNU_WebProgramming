module.exports.all_get = (req, res) => {
    res.send('list of all lesson slots by number with specified start time and end time');
}

module.exports.edit_put = (req, res) => {
    res.send('change lesson slots');
}

module.exports.one_get = (req, res) => {
    res.send('start time and end time of a particular lesson slot by number');
}