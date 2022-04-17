const teacherService = (teacherModel, lessonModel, slotModel, dayModel) => {
    const getAll = async () => {
        return await teacherModel.find({}, '-__v').exec();
    }

    const createOne = async (teacher) => {
        await teacherModel.create(teacher);
    }

    const editOne = async (teacherId, newValues) => {
        const teacher = await teacherModel.findById(teacherId);

        for(let key of Object.keys(newValues)) {
            teacher[key] = newValues[key];
        }

        await teacher.save();
    }
    
    const deleteOne = async (teacherId) => {
        const teacher = await teacherModel.findById(teacherId);
        await teacher.deleteOne();
    }

    const getSchedule = async (teacherId, date = undefined, slot = undefined, time = undefined) => {
        let filter = {};
        filter.teacher = teacherId;

        if(date) {
            filter.day = date.getDay();
            filter.week = { $in: ['AB', await dayModel.findOne({ date: date }, 'type').exec()] };
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

    const getRemainingSchedule = async (teacherId) => {
        let filter = {};
        filter.teacher = teacherId;

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

module.exports = teacherService;