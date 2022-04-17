const lessonService = (lessonModel) => {
    const createOne = async (lesson) => {
        await lessonModel.create(lesson);
    }

    const getOne = async (lessonId) => {
        return await lessonModel.findById(lessonId, '-__v').populate('teacher', 'name').exec();
    }

    const deleteOne = async (lessonId) => {
        const lesson = await lessonModel.findById(lessonId);

        if(!lesson)
            throw new Error('Lesson not found');

        await lesson.deleteOne();
    }

    const editOne = async (lessonId, newValues) => {
        const lesson = await lessonModel.findById(lessonId);

        if(!lesson)
            throw new Error('Lesson not found');

        for(let key of Object.keys(newValues)) {
            if(newValues[key])
                lesson[key] = newValues[key];
        }

        await lesson.save();
    }

    return {
        createOne,
        getOne,
        deleteOne,
        editOne
    }
}

module.exports = lessonService;