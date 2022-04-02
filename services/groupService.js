const groupService = (groupModel, lessonModel, slotModel, dayModel) => {
    const getAll = async () => {
        return await groupModel.find({}, '-_id -__v').exec();
    }

    const createOne = async (group) => {
        await groupModel.create(group);
    }

    const editOne = async (groupName, newValues) => {
        const group = await groupModel.findOne({ groupName: groupName }).exec();

        for(let key of Object.keys(newValues)) {
            group[key] = newValues[key];
        }

        await group.save();
    }
    
    const deleteOne = async (groupName) => {
        const group = await groupModel.findOne({ groupName: groupName }).exec();
        await group.deleteOne();
    }

    const getSchedule = async (groupName, date = undefined, lesson = undefined, time = undefined) => {
        let filter = {};
        filter.group = groupName;

        if(date) {
            filter.day = date.getDay();
            filter.week = { $in: ['AB', await dayModel.findOne({ date: date }, 'type').exec()] };
        }

        if(lesson) {
            filter.slot = lesson;
        } else if(time) {
            filter.slot = (await slotModel.findOne({ start: { $lte: time }, end: { $gte: time } }, 'number -_id').exec())?.number;
        }

        let lessons = await lessonModel.find(filter, '-__v').exec();
        return lessons;
    }

    const getRemainingSchedule = async (groupName) => {
        let filter = {};
        filter.group = groupName;

        let date = new Date();
        let time = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        time += ':';
        time += date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`; 

        date.setUTCHours(0);
        date.setUTCMinutes(0);

        filter.day = date.getDay();
        filter.week = { $in: ['AB', await dayModel.findOne({ date: date }, 'type').exec()] };

        filter.slot = { $in: await slotModel.find({ end: { $gte: time } }, 'number').exec() }

        let lessons = await lessonModel.find(filter, '-__v').exec();
        return lessons;
    }

    return {
        getAll,
        createOne,
        editOne,
        deleteOne,
        getSchedule,
        getRemainingSchedule
    }
}

module.exports = groupService;