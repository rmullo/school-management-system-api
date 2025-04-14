const express = require('express');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher');

const examRouter = express.Router();
const {
    createExamCtrl,
    getAllExamsCtrl,
    getExamCtrl,
    updateExamCtrl,
    deleteExamCtrl
} = require('../../controller/academics/examsCtrl');
const isLogin = require('../../middlewares/isLogin');

examRouter.route('/',isTeacherLogin, isTeacher)
    .post(createExamCtrl)
    .get(getAllExamsCtrl);
examRouter.route('/:id', isTeacherLogin, isTeacher)
    .get(getExamCtrl)
    .put(updateExamCtrl);
module.exports = examRouter;