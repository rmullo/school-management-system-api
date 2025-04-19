const express = require("express");
const {
    registerAdmCtrl, 
    loginAdmCtrl, 
    getAllAdmCtrl, 
    getAdmProfileCtrl, 
    updateAdmCtrl,
    deleteAdmCtrl,
    suspendTeacherCtrl,
    unsuspendTeacherCtrl,
    withdrawTeacherCtrl,
    unwithdrawTeacherCtrl,
    publishExamResultsCtrl,
    unpublishExamResultsCtrl
} = require("../../controller/staff/adminCtrl");   
const isAuth = require('../../middlewares/isAuth');
const advancedResults = require('../../middlewares/advancedResults');
const adminRouter = express.Router();
const Admin = require('../../model/staff/Admin');
const roleRestriction = require('../../middlewares/roleRestriction');


adminRouter.get('/', isAuth(Admin), roleRestriction('admin'), advancedResults(Admin), getAllAdmCtrl)
adminRouter.put('/',isAuth(Admin),roleRestriction('admin'), updateAdmCtrl)
adminRouter.delete('/:id', deleteAdmCtrl)
adminRouter.post('/register', registerAdmCtrl)
adminRouter.post('/login', loginAdmCtrl)
adminRouter.get('/profile',isAuth(Admin), roleRestriction('admin'), getAdmProfileCtrl)
adminRouter.put('/suspend/teacher/:id', suspendTeacherCtrl)
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacherCtrl)
adminRouter.put('/withdraw/teacher/:id', withdrawTeacherCtrl)
adminRouter.put('/unwithdraw/teacher/:id', unwithdrawTeacherCtrl)
adminRouter.put('/publish/examresults/:id', publishExamResultsCtrl)
adminRouter.put('/unpublish/examresults/:id', unpublishExamResultsCtrl)

module.exports = adminRouter;