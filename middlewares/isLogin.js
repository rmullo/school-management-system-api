const verifyToken = require('../utils/verifyToken');
const Admin = require('../model/staff/Admin');
const asyncHandler = require('express-async-handler');

/**
 * Middleware to verify if a user is logged in or not.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next function
 * @throws {Error} Token not found.
 * @throws {Error} Invalid token.
 */
const isLogin = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new Error('Token not found');
    }
   
    const decoded = await verifyToken(token);
    req.user = await Admin.findById(decoded.id).select('id name email role');
    if (!req.user) {
        throw new Error('Invalid token');
    }
    next();  
});

module.exports = isLogin;