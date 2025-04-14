const Exam = require('../../model/academic/Exam');
const Teacher = require('../../model/staff/Teacher');
const asyncHandler = require('express-async-handler');


exports.createExamCtrl = asyncHandler(async (req, res) => {
    const {
        name, 
        description, 
        subject, 
        program, 
        academicTerm, 
        duration, 
        examDate, 
        examTime, 
        examType,
        academicYear,
        classLevel
    } = req.body;

    //find teacher by id
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    //check if exam already exists
    const existingExam = await Exam.findOne({ name });
    if (existingExam) {
        throw new Error('Exam already exists');
    }

    const newExam = new Exam({
        name, 
        description, 
        subject, 
        program, 
        academicTerm, 
        duration, 
        examDate, 
        examTime, 
        examType,
        academicYear,
        createdBy: teacher._id,
        classLevel
    });

    //push exam to teacher
    teacher.examsCreated.push(newExam._id);
    await teacher.save();
    await newExam.save();

    res.status(201).json({
        status: 'success',
        data: newExam,
        message: 'Exam created successfully'
    });

});

exports.getAllExamsCtrl = asyncHandler(async (req, res) => {
    const exams = await Exam.find().populate('createdBy subject program academicTerm classLevel academicYear');
    res.status(200).json({
        status: 'success',
        data: exams
    });
});

exports.getExamCtrl = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id).populate('createdBy subject program academicTerm classLevel academicYear');
    if (!exam) {
        throw new Error('Exam not found');
    }
    res.status(200).json({
        status: 'success',
        data: exam
    });
});

exports.updateExamCtrl = asyncHandler(async (req, res) => {
    const {
        name, 
        description, 
        subject, 
        program, 
        academicTerm, 
        duration, 
        examDate, 
        examTime, 
        examType,
        academicYear,
        classLevel
    } = req.body;

    //check if exam already exists
    const existingExam = await Exam.findOne({ name });
    if (existingExam) {
        throw new Error('Exam already exists');
    }

    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: 'success',
        data: updatedExam
    });
});
