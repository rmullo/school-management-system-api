const verifyToken = require('../utils/verifyToken');
const asyncHandler = require('express-async-handler');

const isAuth = (model) => {return async (req, res, next) => {
    
            console.log(req.headers.authorization);
            console.log(req.headers.authorization.startsWith('Bearer'));
            
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }
            if (!token) {
                throw new Error('Token not found');
            }
        
            const decoded = await verifyToken(token);
            req.user = await model.findById(decoded.id).select('id name email role');
            if (!req.user) {
                throw new Error('Invalid token');
            }
            
            next();
        
}};

module.exports = isAuth;