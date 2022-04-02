const slotService = (slotModel) => {
    const getAll = async () => {
        return await slotModel.find({}, '-_id -__v').exec();
    }

    const replaceAll = async (slots) => {
        await slotModel.deleteMany({});
        await slotModel.insertMany(slots);
    }

    const getOne = async (number) => {
        return await slotModel.findOne({ number: number }, '-_id -__v').exec();
    }

    return {
        getAll,
        replaceAll,
        getOne
    }
}

module.exports = slotService;