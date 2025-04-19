const roleRestriction = (...roles) =>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error('You are not authorized to perform this action');
        }
        next();
} };

module.exports = roleRestriction;