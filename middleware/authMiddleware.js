const Admin = require('../models/Admin');
const adminService = require('../services/adminService')(Admin);
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger');

module.exports.check = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header?.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        if(error) {
            return res.sendStatus(403);
        }

        const admin = await adminService.getOne(payload._id);

        if(!admin) {
            return res.sendStatus(401);
        }

        next();
    })
}

module.exports.checkAndGet = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header?.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        if(error) {
            return res.sendStatus(403);
        }

        const admin = await adminService.getOne(payload._id);

        if(!admin) {
            return res.sendStatus(401);
        }

        req.admin = admin;

        next();
    })
}