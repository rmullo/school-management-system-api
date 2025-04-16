const Question = require('../../model/academic/Questions');
const Teacher = require('../../model/staff/Teacher');
const Exam = require('../../model/academic/Exam');
const asyncHandler = require('express-async-handler');

exports.createQuestionCtrl = asyncHandler(async (req, res) => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer} = req.body;

    const examFound = await Exam.findById(req.params.examId);
    if (!examFound) {
        throw new Error('Exam not found');
    }

    //check if question already exists
    const existingQuestion = await Question.findOne({ question });
    if (existingQuestion) {
        throw new Error('Question already exists');
    }

    const newQuestion = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.user._id
    });

    //push question to exam
    examFound.questions.push(newQuestion._id);
    await examFound.save();

    res.status(201).json({
        status: 'success',
        data: newQuestion,  
        message: 'Question created successfully'
    })
});

exports.getAllQuestionsCtrl = asyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(200).json({
        status: 'success',
        data: questions
    });
});

exports.getQuestionCtrl = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    if (!question) {
        throw new Error('Question not found');
    }
    res.status(200).json({
        status: 'success',
        data: question
    });
});

exports.updateQuestionCtrl = asyncHandler(async (req, res) => {    
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) {
        throw new Error('Question not found');
    }
    res.status(200).json({
        status: 'success',
        data: question,
        message: 'Question updated successfully'
    });
});