const Student = require("../../model/academic/Student");
const { hashPassword, comparePassword } = require("../../utils/helpers");
const generateAuthToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/academic/ClassLevel");

exports.adminRegisterStudentCtrl = asyncHandler(async (req, res) => {
    const { name, email, password, } = req.body;

    const student = await Student.findOne({ email });
    if (student) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const studentCreated = await Student.create({
        name,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status: "success",
        data: studentCreated,
        message: "Student registered successfully",
    });
});

exports.studentLoginCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordCorrect = await comparePassword(password, student.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid Credentials");
    }
    res.status(200).json({
        status: "success",
        token: generateAuthToken(student._id),
        message: "Student logged in successfully",
    });
});

exports.getStudentProfileCtrl = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.user._id).select("-password -createdAt -updatedAt");
    
    res.status(200).json({
        status: "success",
        data: student,
        message: "Student fetched successfully",
    });
});

exports.adminGetAllStudentsCtrl = asyncHandler(async (req, res) => {
    const students = await Student.find().select("-password -createdAt -updatedAt");
    res.status(200).json({
        status: "success",
        data: students,
        message: "Students fetched successfully",
    });
});

exports.adminGetStudentCtrl = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id).select("-password -createdAt -updatedAt");
    if (!student) {
        throw new Error("Student not found");
    }
    res.status(200).json({
        status: "success",
        data: student,
        message: "Student fetched successfully",
    });
})

exports.studentUpdateProfileCtrl = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const student = await Student.findById(req.user._id);
    
    if(req.body.name){
        student.name = name;
    }
    if(req.body.email){
        student.email = email;
        //check if email already exists
        const student = await Student.findOne({email});
        if (student) {
            throw new Error('Email already exists');
        }
    }
    if(req.body.password){
        student.password = await hashPassword(password);
    }
   
    await student.save();
    res.status(200).json({
        status: "success",
        data: student,
        message: "Student updated successfully",
    });
});

exports.adminUpdateStudentCtrl = asyncHandler(async (req, res) => {
   const {classLevels, academicYear, program, name, email, prefectName} = req.body; 

   const student = await Student.findById(req.params.id);
   if(!student){
       throw new Error('Student not found');
   }

   if(email){
       const student = await Student.findOne({email});
       if (student) {
           throw new Error('Email already exists');
       }
   }

   const studentUpdated = await Student.findByIdAndUpdate(req.params.id, 
    {
        $set: {
            academicYear,
            program,
            name,
            email,
            prefectName
        },
        $addToSet: {
            classLevels
        }
    },
    { new: true, runValidators: true }
    ).select('-password -createdAt -updatedAt');

    res.status(200).json({
        status: 'success',
        data: studentUpdated,
        message: 'Student updated successfully'
    });
});