const verifyToken = require('../utils/verifyToken');
const Admin = require('../model/staff/Admin');

const isLogin = async (req, res, next) => {
    //get token from headers
    const token = req.headers.authorization;
    if (!token) {
        throw new Error('Token not found');
    }
    //verify token
    const decoded = verifyToken(token);
    if (!decoded) {
        throw new Error('Invalid token');
    }

    const admin = await Admin.findById(decoded.id).select('name email role');
    req.user = admin;

    next();
};

module.exports = isLogin;