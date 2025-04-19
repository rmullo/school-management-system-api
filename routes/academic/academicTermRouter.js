const express = require("express");
const {
    createAcademicTermCtrl,
    getAcademicTermsCtrl,
    getAcademicTermCtrl,
    updateAcademicTermCtrl,
    deleteAcademicTermCtrl,
} = require("../../controller/academics/academicTermCtrl");
const isAuth = require('../../middlewares/isAuth');
const Admin = require('../../model/staff/Admin');
const roleRestriction = require('../../middlewares/roleRestriction');
const academicTermRouter = express.Router();

academicTermRouter.route('/').post(isAuth(Admin), roleRestriction('admin'), createAcademicTermCtrl).get(isAuth(Admin), roleRestriction('admin'), getAcademicTermsCtrl);
academicTermRouter.route('/:id').get(isAuth(Admin), roleRestriction('admin'), getAcademicTermCtrl).put(isAuth(Admin), roleRestriction('admin'), updateAcademicTermCtrl).delete(isAuth(Admin), roleRestriction('admin'), deleteAcademicTermCtrl);

module.exports = academicTermRouter;