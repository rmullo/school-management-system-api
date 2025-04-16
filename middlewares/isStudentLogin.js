const verifyToken = require('../utils/verifyToken');
const Student = require('../model/academic/Student');
const asyncHandler = require('express-async-handler');

const isStudentLogin = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new Error('Token not found');
    }
   
    const decoded = await verifyToken(token);
    req.user = await Student.findById(decoded.id).select('id name email role');
    if (!req.user) {
        throw new Error('Invalid token');
    }
    next();  
});

module.exports = isStudentLogin;