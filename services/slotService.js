const slotService = (slotModel) => {
    const getAll = async () => {
        return await slotModel.find({}, '-_id -__v').exec();
    }

    const replaceAll = async (slots) => {
        await slotModel.deleteMany({});
        await slotModel.insertMany(slots);
    }

    const getOne = async (number) => {
        let slot = await slotModel.findOne({ number: number }, '-_id -__v').exec();

        if(!slot)
            throw new Error('Slot not found')

        return slot;
    }

    return {
        getAll,
        replaceAll,
        getOne
    }
}

module.exports = slotService;