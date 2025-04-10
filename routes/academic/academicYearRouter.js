const express = require("express");
const {
    createAcademicYearCtrl,
    getAllAcademicYearsCtrl,
    getAcademicYearCtrl,
    updateAcademicYearCtrl,
    deleteAcademicYearCtrl,
} = require("../../controller/academics/academicYearCtrl");
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const academicYearRouter = express.Router();

academicYearRouter.route('/').post(isLogin, isAdmin, createAcademicYearCtrl).get(isLogin, isAdmin, getAllAcademicYearsCtrl);
academicYearRouter.route('/:id').get(isLogin, isAdmin, getAcademicYearCtrl).put(isLogin, isAdmin, updateAcademicYearCtrl).delete(isLogin, isAdmin, deleteAcademicYearCtrl);

module.exports = academicYearRouter;