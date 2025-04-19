const asyncHandler = require('express-async-handler');
const Teacher = require('../../model/staff/Teacher');
const {hashPassword, comparePassword} = require('../../utils/helpers.js');
const generateAuthToken = require('../../utils/generateToken.js');
const Program = require('../../model/academic/Program');
const AcademicYear = require('../../model/academic/AcademicYear');
const ClassLevel = require('../../model/academic/ClassLevel');

exports.registerTeacherCtrl = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    //check if email already exists
    const teacher = await Teacher.findOne({email});
    if (teacher) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newTeacher = await Teacher.create({
        name,
        email,
        password: hashedPassword,
        createdBy: req.user._id
    });

    //push into the admins array
    const admin = await Admin.findById(req.user._id);
    admin.teachers.push(newTeacher._id);
    await admin.save();
    
    res.status(201).json({
        status: 'success',
        data: newTeacher,
        message: 'Teacher registered successfully'
    })
});

exports.loginTeacherCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //find user by email
    const teacher = await Teacher.findOne({email});
    if (!teacher) {
        throw new Error('Invalid Credentials');
    }
    //check if password is correct
    const isPasswordCorrect = await comparePassword(password, teacher.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials');
    }
    //return JWT token
    res.status(200).json({
        status: 'success',
        token: generateAuthToken(teacher._id),
        message: 'Teacher logged in successfully'    
    })
});

exports.adminGetTeachersCtrl = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find();
    res.status(200).json({
        status: 'success',
        data: teachers,
        message: 'Teachers fetched successfully'
    })
});

exports.adminGetTeacherCtrl = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
        throw new Error('Teacher not found');
    }
    res.status(200).json({
        status: 'success',
        data: teacher,
        message: 'Teacher fetched successfully'
    })
});

exports.getTeacherProfileCtrl = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) {
        throw new Error('Teacher not found');
    }
    res.status(200).json({
        status: 'success',
        data: teacher,
        message: 'Teacher fetched successfully'
    })
});

exports.updateTeacherCtrl = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    if(req.body.name){
        teacher.name = req.body.name;
    }
    if(req.body.email){
        teacher.email = req.body.email;
    }
    if(req.body.password){
        teacher.password = await hashPassword(req.body.password);
    }
    const updatedTeacher = await teacher.save();
    res.status(200).json({
        status: 'success',
        data: updatedTeacher,
        message: 'Teacher updated successfully'
    })
});

exports.adminUpdateTeacherCtrl = asyncHandler(async (req, res) => {
    const {program, classLevel, academicYear, subject} = req.body;
    const teacher = await Teacher.findById(req.params.id);
    if(!teacher){
        throw new Error('Teacher not found');
    }

    //check if teacher is suspended/withdrawn
    if(teacher.isSuspended || teacher.isWitdrawn){
        throw new Error('Teacher is suspended or withdrawn');
    }

    //check if every field is null
    if(!program && !classLevel && !academicYear && !subject){
        throw new Error('No field is updated');
    }

    if(program){
        teacher.program = program;
        teacher.save();
        res.status(200).json({
            status: 'success',
            data: teacher,
            message: 'Teacher updated successfully'
        });
    }
    if(classLevel){
        teacher.classLevel = classLevel;
        teacher.save();
        res.status(200).json({
            status: 'success',
            data: teacher,
            message: 'Teacher updated successfully'
        });
    }
    if(academicYear){
        teacher.academicYear = academicYear;
        teacher.save();
        res.status(200).json({
            status: 'success',
            data: teacher,
            message: 'Teacher updated successfully'
        });
    }
    if(subject){
        teacher.subject = subject;
        teacher.save();
        res.status(200).json({
            status: 'success',
            data: teacher,
            message: 'Teacher updated successfully'
        });
    }
});