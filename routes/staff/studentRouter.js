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
const isAuth = require('../../middlewares/isAuth');
const Student = require('../../model/academic/Student');
const Admin = require('../../model/staff/Admin');	
const roleRestriction = require('../../middlewares/roleRestriction');

studentRouter.route('/admin/register')
    .post(isAuth(Admin), roleRestriction('admin'), adminRegisterStudentCtrl);
studentRouter.route('/login')
    .post(studentLoginCtrl);
studentRouter.route('/profile')
    .get(isAuth(Student), roleRestriction('student'), getStudentProfileCtrl);
studentRouter.route('/admin')
    .get(isAuth(Admin), roleRestriction('admin'), adminGetAllStudentsCtrl);
    studentRouter.route('/:id/admin/')
    .get(isAuth(Admin), roleRestriction('admin'), adminGetStudentCtrl);
studentRouter.route('/exam/:id/write')
    .post(isAuth(Student), roleRestriction('student'), writeExamCtrl);
studentRouter.route('/update')
    .put(isAuth(Student), roleRestriction('student'), studentUpdateProfileCtrl);
studentRouter.route('/:id/update/admin')
    .put(isAuth(Admin), roleRestriction('admin'), adminUpdateStudentCtrl);

module.exports = studentRouter;
