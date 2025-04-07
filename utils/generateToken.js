const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * @param {string} id - The user ID to generate the token for.
 * @returns {string} The generated JWT.
 */
const generateAuthToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return 'Bearer ' + token;
};


module.exports = generateAuthToken;