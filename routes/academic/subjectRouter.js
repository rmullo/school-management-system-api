const express = require("express");
const {
    createSubjectCtrl,
    getSubjectsCtrl,
    getSubjectCtrl,
    updateSubjectCtrl,
    deleteSubjectCtrl
      
} = require("../../controller/academics/subjectCtrl");
const isAuth = require('../../middlewares/isAuth');
const Admin = require('../../model/staff/Admin');
const roleRestriction = require('../../middlewares/roleRestriction');
const subjectRouter = express.Router();

subjectRouter.route('/').get(isAuth(Admin), roleRestriction('admin'), getSubjectsCtrl);
subjectRouter.route('/:id').post(isAuth(Admin), roleRestriction('admin'), createSubjectCtrl).get(isAuth(Admin), roleRestriction('admin'), getSubjectCtrl).put(isAuth(Admin), roleRestriction('admin'), updateSubjectCtrl).delete(isAuth(Admin), roleRestriction('admin'), deleteSubjectCtrl);

module.exports = subjectRouter;