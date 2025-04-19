const asyncHandler = require('express-async-handler');
const ExamResult = require('../../model/academic/ExamResults');
const Exam = require('../../model/academic/Exam');
const Student = require('../../model/academic/Student');

exports.checkExamResultCtrl = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.user._id);    
    if (!student) {
        throw new Error("Student not found");
    }    

    const examResult = await ExamResult.findOne({
        studentId:student.studentId,
        _id:req.params.id
    }).populate('classLevel academicYear academicTerm').populate({
        path: 'exam',
        populate: {
            path: 'questions'
        }
    });
    if (!examResult) {
        throw new Error("You have not taken this exam");
    }

    res.status(200).json({
        status: "success",
        message: "You can take the exam",
        data:examResult
    });
});

exports.getAllExamResultsCtrl = asyncHandler(async (req, res) => {
    const examResults = await ExamResult.find().select('exam').populate('exam');
    res.status(200).json({
        status: 'success',
        data: examResults
    });
});

exports.adminToggleExamResultsCtrl = asyncHandler(async (req, res) => {
    const examResults = await ExamResult.findById(req.params.id);
    if (!examResults) {
        throw new Error("Exam Results not found");
    }
    await ExamResult.findByIdAndUpdate(req.params.id, {
        $set: {
            isPublished: req.body.isPublished
        },
        new:true
    });

    res.status(200).json({
        status: 'success',
        data: examResults
    });
});