const Admin = require('../models/Admin');
const adminService = require('../services/adminService')(Admin);
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');

const jwtSign = (admin) => {
    return jwt.sign({ _id: admin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
}

module.exports.all_get = async (req, res) => {
    let admins;

    try {
        admins = await adminService.getAll();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.json(admins);
}

module.exports.create_post = async (req, res) => {
    const { email, password } = req.body;

    let admin;

    try {
        admin = await adminService.createOne(email, password);
        logger.info('POST /admins/ - Successful');
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    const accessToken = jwtSign(admin);

    res.json({ accessToken });
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    let admin;

    try {
        admin = await adminService.checkAndGet(email, password);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: error.message });
    }

    if(!admin) {
        return res.sendStatus(401);
    }

    const accessToken = jwtSign(admin);

    res.json({ accessToken });
}

module.exports.delete_delete = async (req, res) => {
    const adminId = req.params.adminId;

    try {
        await adminService.deleteOne(adminId);
        logger.info('DELETE /admins/:adminId - Successful');
    } catch (error) {
        if(error.message === 'Admin not found') {
            logger.info('DELETE /admins/:adminId - Unsuccessful (admin not found)');
            return res.status(404).json({ error: error.message });
        } else {
            logger.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.sendStatus(200);
}