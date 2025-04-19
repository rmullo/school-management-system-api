const express = require('express');
const studentRouter = express.Router();
const {
    adminRegisterStudentCtrl, 
    studentLoginCtrl,
    getStudentProfileCtrl,
    adminGetAllStudentsCtrl,
    adminGetStudentCtrl,
    studentUpdateProfileCtrl,
    adminUpdateStudentCtrl,
    writeExamCtrl
} = require('../../controller/students/studentsCtrl');
const isStudent = require('../../middlewares/isStudent');
const isStudentLogin = require('../../middlewares/isStudentLogin');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');

studentRouter.route('/admin/register')
    .post(isLogin, isAdmin, adminRegisterStudentCtrl);
studentRouter.route('/login')
    .post(studentLoginCtrl);
studentRouter.route('/profile')
    .get(isStudentLogin, isStudent, getStudentProfileCtrl);
studentRouter.route('/admin')
    .get(isLogin, isAdmin, adminGetAllStudentsCtrl);
    studentRouter.route('/:id/admin/')
    .get(isLogin, isAdmin, adminGetStudentCtrl);
studentRouter.route('/exam/:id/write')
    .post(isStudentLogin, isStudent, writeExamCtrl);
studentRouter.route('/update')
    .put(isStudentLogin, isStudent, studentUpdateProfileCtrl);
studentRouter.route('/:id/update/admin')
    .put(isLogin, isAdmin, adminUpdateStudentCtrl);

module.exports = studentRouter;
