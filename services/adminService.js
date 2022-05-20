const bcrypt = require('bcrypt');

const adminService = (adminModel) => {
    const getAll = async () => {
        return await adminModel.find({}, '-password -__v').exec();
    }

    const getOne = async (adminId) => {
        return await adminModel.findById(adminId);
    }

    const createOne = async (email, password) => {
        hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        return await adminModel.create({ email, password: hash });
    }

    const deleteOne = async (adminId) => {
        const admin = await adminModel.findById(adminId);

        if(!admin)
            throw new Error('Admin not found');

        await admin.deleteOne();
    }

    const checkAndGet = async (email, password) => {
        const admin = await adminModel.findOne({ email }).exec();

        if(!admin)
            return false;

        const passwordCheck = await bcrypt.compare(password, admin.password);

        if(passwordCheck)
            return admin;
        else
            return false;
    }

    return {
        getAll,
        getOne,
        createOne,
        deleteOne,
        checkAndGet
    }
}

module.exports = adminService;