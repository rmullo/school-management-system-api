const express = require('express');
const questionRouter = express.Router();
const {
    createQuestionCtrl,
    getAllQuestionsCtrl,
    getQuestionCtrl,
    updateQuestionCtrl
} = require('../../controller/academics/questionsCtrl');
const Teacher = require('../../model/staff/Teacher');
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');

questionRouter.route('/').get(isAuth(Teacher), roleRestriction('teacher'), getAllQuestionsCtrl);
questionRouter.route('/:id')
    .get(isAuth(Teacher), roleRestriction('teacher'), getQuestionCtrl)
    .put(isAuth(Teacher), roleRestriction('teacher'), updateQuestionCtrl);
questionRouter.route('/:examId').post(isAuth(Teacher), roleRestriction('teacher'), createQuestionCtrl);
module.exports = questionRouter;
