const express = require("express");
const {
    createAcademicYearCtrl,
    getAllAcademicYearsCtrl,
    getAcademicYearCtrl,
    updateAcademicYearCtrl,
    deleteAcademicYearCtrl,
} = require("../../controller/academics/academicYearCtrl");
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');
const academicYearRouter = express.Router();
const Admin = require('../../model/staff/Admin');

academicYearRouter.route('/').post(isAuth(Admin), roleRestriction('admin'), createAcademicYearCtrl).get(isAuth(Admin), roleRestriction('admin'), getAllAcademicYearsCtrl);
academicYearRouter.route('/:id').get(isAuth(Admin), roleRestriction('admin'), getAcademicYearCtrl).put(isAuth(Admin), roleRestriction('admin'), updateAcademicYearCtrl).delete(isAuth(Admin), roleRestriction('admin'), deleteAcademicYearCtrl);

module.exports = academicYearRouter;