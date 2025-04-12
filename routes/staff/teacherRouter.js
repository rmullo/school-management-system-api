const express = require('express');
const teacherRouter = express.Router();
const {
    registerTeacherCtrl, 
    loginTeacherCtrl, 
    adminGetTeachersCtrl,
    adminGetTeacherCtrl,
    adminUpdateTeacherCtrl, 
    getTeacherProfileCtrl,
    getTeacherCtrl, 
    updateTeacherCtrl, 
    deleteTeacherCtrl
} = require('../../controller/staff/teacherCtrl');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const isTeacher = require('../../middlewares/isTeacher');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');

teacherRouter.route('/admin/register')
    .post(isLogin, isAdmin, registerTeacherCtrl)
teacherRouter.route('/login')
    .post(loginTeacherCtrl);
teacherRouter.route('/admin')
    .get(isLogin, isAdmin, adminGetTeachersCtrl);
teacherRouter.route('/profile')
    .get(isTeacherLogin, isTeacher, getTeacherProfileCtrl)
teacherRouter.route('/:id/update')
    .put(isTeacherLogin, isTeacher, updateTeacherCtrl)
teacherRouter.route('/:id/admin')
    .get(isLogin, isAdmin, adminGetTeacherCtrl);
teacherRouter.route('/:id/update/admin')
    .put(isLogin, isAdmin, adminUpdateTeacherCtrl);

module.exports = teacherRouter;
