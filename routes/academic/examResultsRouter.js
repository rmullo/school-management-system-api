const express = require('express');
const {
    checkExamResultCtrl,
    getAllExamResultsCtrl,
    adminToggleExamResultsCtrl
} = require('../../controller/academics/examResultsCtrl');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const isStudent = require('../../middlewares/isStudent');
const isStudenteLogin = require('../../middlewares/isStudentLogin');
const examResultsRouter = express.Router();

examResultsRouter.route('/:id/checking').get(isStudenteLogin, isStudent, checkExamResultCtrl);
examResultsRouter.route('/').get(isStudenteLogin, isStudent, getAllExamResultsCtrl);

examResultsRouter.route('/:id/admin-toggle-published').put(isLogin, isAdmin, adminToggleExamResultsCtrl);

module.exports = examResultsRouter;
