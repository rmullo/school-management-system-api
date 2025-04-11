const express = require("express");
const {
    createAcademicTermCtrl,
    getAcademicTermsCtrl,
    getAcademicTermCtrl,
    updateAcademicTermCtrl,
    deleteAcademicTermCtrl,
} = require("../../controller/academics/academicTermCtrl");
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const academicTermRouter = express.Router();

academicTermRouter.route('/').post(isLogin, isAdmin, createAcademicTermCtrl).get(isLogin, isAdmin, getAcademicTermsCtrl);
academicTermRouter.route('/:id').get(isLogin, isAdmin, getAcademicTermCtrl).put(isLogin, isAdmin, updateAcademicTermCtrl).delete(isLogin, isAdmin, deleteAcademicTermCtrl);

module.exports = academicTermRouter;