/**
 * Global error handler middleware.
 *
 * @function globalErrHandler
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function in the middleware chain.
 *
 * @returns {undefined}
 */
const globalErrHandler = (err, req, res, next) => {
    const stack = err.stack;
    const message = err.message || 'Something went wrong';
    const status = err.status ? err.status : "failed";
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        status,
        message,
        stack
    });
};

//Not Found
const notFoundErr = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = "fail";
    err.statusCode = 404;
    next(err);
};

module.exports = {globalErrHandler, notFoundErr};