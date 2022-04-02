const lessonService = (lessonModel) => {
    const createOne = async (lesson) => {
        await lessonModel.create(lesson);
    }

    const getOne = async (lessonId) => {
        return await lessonModel.findById(lessonId);
    }

    const deleteOne = async (lessonId) => {
        const lesson = await lessonModel.findById(lessonId);
        await lesson.deleteOne();
    }

    const editOne = async (lessonId, newValues) => {
        const lesson = await lessonModel.findById(lessonId);

        for(let key of Object.keys(newValues)) {
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