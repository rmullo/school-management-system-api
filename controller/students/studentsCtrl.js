const Student = require("../../model/academic/Student");
const { hashPassword, comparePassword } = require("../../utils/helpers");
const generateAuthToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/academic/ClassLevel");
const Exam = require("../../model/academic/Exam");
const ExamResult = require("../../model/academic/ExamResults");

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

    //push into the admins array
    const admin = await Admin.findById(req.user._id);
    admin.students.push(studentCreated._id);
    await admin.save();

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
    const student = await Student.findById(req.user._id).select("-password -createdAt -updatedAt").populate('examResults');

    const studentProfile = {
        name: student.name,
        email: student.email,
        currentClassLevel: student.currentClassLevel,
        dateAdmitted: student.dateAdmitted,
        studentId: student.studentId,
        program: student.program,
        prefectName: student.prefectName,
        isSuspended: student.isSuspended,
        isWithdrawn: student.isWithdrawn
    }
    
    const examResults = student.examResults;
    const currentExamResults = examResults[examResults.length - 1];
    const isPublished = currentExamResults.isPublished;


    res.status(200).json({
        status: "success",
        data: {
            studentProfile,
            currentExamResults: isPublished? currentExamResults : null
        },
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
   const {classLevels, academicYear, program, name, email, prefectName, isSuspended, isWithdrawn} = req.body; 

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
            prefectName,
            isSuspended, 
            isWithdrawn
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

exports.writeExamCtrl = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.user._id);

    const exam = await Exam.findById(req.params.id).populate('questions');
    if (!exam) {
        throw new Error("Exam not found");
    }
    
    const questions = exam.questions;
    
    const answers = req.body.answers;

    //check if student has answered all the questions
    if (answers.length !== questions.length) {
        throw new Error("You have not answered all the questions");
    }

    //check if student are suspended or withdrawn
    if (student.isSuspended || student.isWithdrawn) {
        throw new Error("You are suspended or withdrawn");
    }

    const studentFoundOnResults = await ExamResult.findOne({ student: student._id, exam: exam._id });
    if (studentFoundOnResults) {
        throw new Error("You have already taken this exam");
    }

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let totalQuestions = 0;
    let grade = 0;
    let score = 0;
    let remarks = "";
    let answeredQuestions = [];
    let status = ""; //failed or passed

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = answers[i];
        totalQuestions++;
        if (question.correctAnswer === answer) {
            correctAnswers++;
            score++;
            question.correct = true;
        } else {
            wrongAnswers++;
        }
        
    }

    //calculate reports
    totalQuestions = answers.length;
    grade = (correctAnswers / totalQuestions) * 100;
    answeredQuestions = questions.map(question =>{
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            isCorrect: question.isCorrect
        }
    });

    if (grade >= 50) {
        status = "Pass";
    } else {
        status = "Fail";
    }

    //remarks
    if (grade >= 80) {
        remarks = "Excellent";
    } else if (grade >= 70) {
        remarks = "Very Good";
    } else if (grade >= 60) {
        remarks = "Good";
    } else if (grade >= 50) {
        remarks = "Fair";
    } else {
        remarks = "Poor";
    }

    const examResult = await ExamResult.create({
        studentId: student.studentId,
        exam: req.params.id,
        grade,
        score,
        status,
        remarks,
        classLevel: exam.classLevel,
        academicYear: exam.academicYear,
        academicTerm: exam.academicTerm,
    });

    student.examResults.push(examResult._id);
    await student.save();


    if(
        exam.academicTerm.name === "3rd term" &&
        status === "Pass" &&
        student?.currentClassLevel === "Level 100"
    ){
        student.classLevels.push("Level 200");
        student.currentClassLevel = "Level 200";
        await student.save();
    }
    
    if(
        exam.academicTerm.name === "3rd term" &&
        status === "Pass" &&
        student?.currentClassLevel === "Level 200"
    ){
        student.classLevels.push("Level 300");
        student.currentClassLevel = "Level 300";
        await student.save();
    }
    if(
        exam.academicTerm.name === "3rd term" &&
        status === "Pass" &&
        student?.currentClassLevel === "Level 300"
    ){
        student.classLevels.push("Level 400");
        student.currentClassLevel = "Level 400";
        await student.save();
    }

    if(
        exam.academicTerm.name === "3rd term" &&
        status === "Pass" &&
        student?.currentClassLevel === "Level 400"
    ){
        student.isGraduated = true;
        student.yearGraduated = exam.academicYear;
        await student.save();
    }

    res.status(200).json({
        status: "success",
        correctAnswers,
        wrongAnswers,
        score,
        grade,
        status,
        remarks,
        answeredQuestions,
        exameResult,
        message: "Exam written successfully",
    });
});