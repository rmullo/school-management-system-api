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
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');
const Teacher = require('../../model/staff/Teacher');
const Admin = require('../../model/staff/Admin');

teacherRouter.route('/admin/register')
    .post(isAuth(Admin), roleRestriction('admin'), registerTeacherCtrl)
teacherRouter.route('/login')
    .post(loginTeacherCtrl);
teacherRouter.route('/admin')
    .get(isAuth(Admin), roleRestriction('admin'), adminGetTeachersCtrl);
teacherRouter.route('/profile')
    .get(isAuth(Teacher), roleRestriction('teacher'), getTeacherProfileCtrl)
teacherRouter.route('/:id/update')
    .put(isAuth(Teacher), roleRestriction('teacher'), updateTeacherCtrl)
teacherRouter.route('/:id/admin')
    .get(isAuth(Admin), roleRestriction('admin'), adminGetTeacherCtrl);
teacherRouter.route('/:id/update/admin')
    .put(isAuth(Admin), roleRestriction('admin'), adminUpdateTeacherCtrl);

module.exports = teacherRouter;
