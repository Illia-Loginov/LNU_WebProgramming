const groupService = (groupModel, lessonModel, slotModel, dayModel) => {
    const getAll = async () => {
        return await groupModel.find({}, '-_id -__v').exec();
    }

    const createOne = async (group) => {
        await groupModel.create(group);
    }

    const deleteOne = async (groupName) => {
        const group = await groupModel.findOne({ name: groupName }).exec();

        if(!group)
            throw new Error('Group not found');

        await group.deleteOne();
    }

    const getSchedule = async (groupName, date = undefined, slot = undefined, time = undefined) => {
        let filter = {};
        filter.groups = groupName;

        if(date) {
            filter.day = date.getDay();
            filter.week = { $in: ['AB', (await dayModel.findOne({ date: date }, 'type').exec()).type] };
        }

        if(slot) {
            filter.slot = slot;
        } else if(time) {
            filter.slot = (await slotModel.findOne({ start: { $lte: time }, end: { $gte: time } }, 'number -_id').exec())?.number;
        }

        let lessons = await lessonModel.find(filter, '-__v').sort('day slot').populate('teacher', 'name').exec();

        if(!date) {
            let days = {};
            for(let lesson of lessons) {
                if(days[lesson.day])
                days[lesson.day].push(lesson)
                else
                days[lesson.day] = [lesson];
            }

            return days;
        } else {
            return lessons;
        }
    }

    const getRemainingSchedule = async (groupName) => {
        let filter = {};
        filter.groups = groupName;

        let date = new Date();
        let time = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        time += ':';
        time += date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`; 

        filter.day = date.getDay();
        date.setUTCHours(0);
        date.setUTCMinutes(0);
        if(date.getDay() !== filter.day)
            date.setDate(date.getDate() + 1);
        filter.week = { $in: ['AB', (await dayModel.findOne({ date: date }, 'type').exec())?.type] };

        filter.slot = { $in: (await slotModel.find({ end: { $gte: time } }, 'number').exec()).map(slot => slot.number) }

        let lessons = await lessonModel.find(filter, '-__v').exec();
        return lessons;
    }

    return {
        getAll,
        createOne,
        deleteOne,
        getSchedule,
        getRemainingSchedule
    }
}

module.exports = groupService;