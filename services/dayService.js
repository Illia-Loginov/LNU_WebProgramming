const dayService = (dayModel) => {
    const getAll = async () => {
        return await dayModel.find({}, '-_id -__v').exec();
    }

    const replaceAll = async (days) => {
        await dayModel.deleteMany({});
        await dayModel.insertMany(days);
    }

    const getOne = async (date) => {
        let day = await dayModel.findOne({ date: date }, '-_id -__v').exec();

        if(!day)
            throw new Error('Day not found in the semester')

        return await dayModel.findOne({ date: date }, '-_id -__v').exec();
    }

    return {
        getAll,
        replaceAll,
        getOne
    }
}

module.exports = dayService;