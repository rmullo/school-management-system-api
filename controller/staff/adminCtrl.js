const Admin = require('../../model/staff/Admin.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateAuthToken = require('../../utils/generateToken.js');
const verifyToken = require('../../utils/verifyToken.js');


/**
 * @desc Registers a new admin
 * @route POST /api/v1/admins/register
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.registerAdmCtrl = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // Check if email already exists
    const admin = await Admin.findOne({ email });
    if (admin) {
        throw new Error('Email already exists');
    }
    const newAdmin = await Admin.create({
        name,
        email,
        password
    });
    res.status(201).json({
        status: 'success',
        data: newAdmin
    });
});


/**
 * @desc Handles the login of an admin.
 * @route POST /api/v1/admins/login
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with a JWT token or an error message
 */
exports.loginAdmCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    //find user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new Error('Invalid Credentials');
    }
    //check if password is correct
    const isPasswordCorrect = await admin.verifyPassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials');
    }
    //return JWT token
    res.status(201).json({
        status: 'success',
        token: generateAuthToken(admin._id)      
    })

    
});

/**
 * @desc Retrieves all admins.
 * @route GET /api/v1/admins
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.getAllAdmCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'All Admins fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Retrieves a single admin by ID.
 * @route GET /api/v1/admins/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.getSingleAdmCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Single Admin fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Updates a single admin by ID.
 * @route PUT /api/v1/admins/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.updateAdmCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Deletes a single admin by ID.
 * @route DELETE /api/v1/admins/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.deleteAdmCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

/**
 * @desc Suspends a teacher
 * @route PUT /api/v1/admins/suspend/teacher/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.suspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Teacher suspended successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Unsuspends a teacher by ID.
 * @route PUT /api/v1/admins/unsuspend/teacher/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.unsuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Teacher unsuspended successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Withdraws a teacher from the system.
 * @route PUT /api/v1/admins/withdraw/teacher/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.withdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Teacher withdrawn successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Unwithdraws a teacher from the system.
 * @route PUT /api/v1/admins/unwithdraw/teacher/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.unwithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Teacher unwithdrawn successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};


/**
 * @desc Publishes exam results for a particular class
 * @route PUT /api/v1/admins/publish/examresults/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.publishExamResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Exam results published successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

/**
 * @desc Unpublishes exam results for a particular class
 * @route PUT /api/v1/admins/unpublish/examresults/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.unpublishExamResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Exam results unpublished successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};