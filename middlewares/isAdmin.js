const Admin = require('../model/staff/Admin');

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new Error('You are not an admin!')
    }
    next();
};

module.exports = isAdmin;