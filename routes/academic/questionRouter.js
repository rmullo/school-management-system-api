const express = require('express');
const questionRouter = express.Router();
const {
    createQuestionCtrl,
    getAllQuestionsCtrl,
    getQuestionCtrl,
    updateQuestionCtrl
} = require('../../controller/academics/questionsCtrl');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher');

questionRouter.route('/').get(isTeacherLogin, isTeacher, getAllQuestionsCtrl);
questionRouter.route('/:id')
    .get(isTeacherLogin, isTeacher, getQuestionCtrl)
    .put(isTeacherLogin, isTeacher, updateQuestionCtrl);
questionRouter.route('/:examId').post(isTeacherLogin, isTeacher, createQuestionCtrl);
module.exports = questionRouter;
