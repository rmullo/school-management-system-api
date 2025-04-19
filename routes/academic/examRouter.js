const express = require('express');
const roleRestriction = require('../../middlewares/roleRestriction');

const examRouter = express.Router();
const {
    createExamCtrl,
    getAllExamsCtrl,
    getExamCtrl,
    updateExamCtrl,
    deleteExamCtrl
} = require('../../controller/academics/examsCtrl');
const isAuth = require('../../middlewares/isAuth');
const Teacher = require('../../model/staff/Teacher');

examRouter.route('/',isAuth(Teacher), roleRestriction('teacher'))
    .post(createExamCtrl)
    .get(getAllExamsCtrl);
examRouter.route('/:id', isAuth(Teacher), roleRestriction('teacher'))
    .get(getExamCtrl)
    .put(updateExamCtrl);
module.exports = examRouter;