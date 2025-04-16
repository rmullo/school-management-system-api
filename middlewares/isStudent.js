const isTeacher = async (req, res, next) => {
    if (req.user.role !== 'student') {
        throw new Error('You are not an teacher!')
    }
    next();
};

module.exports = isTeacher;