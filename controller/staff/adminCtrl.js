const Admin = require('../../model/staff/Admin.js');
const asyncHandler = require('express-async-handler');
const generateAuthToken = require('../../utils/generateToken.js');
const verifyToken = require('../../utils/verifyToken.js');
const { hashPassword, comparePassword } = require('../../utils/helpers.js');


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
        password:await hashPassword(password)
    });
    res.status(201).json({
        status: 'success',
        data: {
            name: newAdmin.name,
            email: newAdmin.email
        },
        message: 'Admin created successfully'
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
    const isPasswordCorrect = await comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials');
    }
    //return JWT token
    res.status(201).json({
        status: 'success',
        token: generateAuthToken(admin._id),
        message: 'Admin logged in successfully'    
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
exports.getAllAdmCtrl = asyncHandler(async (req, res) => {
    const admins = await Admin.find().select('name email role');
    res.status(201).json({
        status: 'success',
        data: admins,
        message: 'Admins fetched successfully'
    })
});

/**
 * @desc Retrieves a single admin by ID.
 * @route GET /api/v1/admins/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.getAdmProfileCtrl = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select('name email role');
    if (!admin) {
        throw new Error('Admin not found');
    }
    res.status(201).json({
        status: 'success',
        data: admin,
        message: 'Admin profile fetched successfully'
    })
});

/**
 * @desc Updates a single admin by ID.
 * @route PUT /api/v1/admins/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends a JSON response with status and data or error message
 */
exports.updateAdmCtrl = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id);
    if (!admin) {
        throw new Error('Admin not found');
    }
    
    req.body.password ? req.body.password = await hashPassword(req.body.password) : null;

    const updatedAdmin = await Admin.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).select('name email role');
    res.status(201).json({
        status: 'success',
        data: updatedAdmin,
        message: 'Admin updated successfully'
    })
});

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