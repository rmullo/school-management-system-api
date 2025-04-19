const express = require('express');
const {
    checkExamResultCtrl,
    getAllExamResultsCtrl,
    adminToggleExamResultsCtrl
} = require('../../controller/academics/examResultsCtrl');
const Admin = require('../../model/staff/Admin');
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');
const Student = require('../../model/academic/Student');
const examResultsRouter = express.Router();

examResultsRouter.route('/:id/checking').get(isAuth(Student), roleRestriction('student'), checkExamResultCtrl);
examResultsRouter.route('/').get(isAuth(Student), roleRestriction('student'), getAllExamResultsCtrl);

examResultsRouter.route('/:id/admin-toggle-published').put(isAuth(Admin), roleRestriction('admin'), adminToggleExamResultsCtrl);

module.exports = examResultsRouter;
