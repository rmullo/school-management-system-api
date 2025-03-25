const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return {
                msg: 'Invalid token',
            };
        }else{
            return decoded;
        }
    });
};  

module.exports = verifyToken;