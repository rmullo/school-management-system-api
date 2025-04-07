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
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const adminRouter = express.Router();


adminRouter.get('/', isLogin, getAllAdmCtrl)
adminRouter.put('/',isLogin,isAdmin, updateAdmCtrl)
adminRouter.delete('/:id', deleteAdmCtrl)
adminRouter.post('/register', registerAdmCtrl)
adminRouter.post('/login', loginAdmCtrl)
adminRouter.get('/profile',isLogin, isAdmin, getAdmProfileCtrl)
adminRouter.put('/suspend/teacher/:id', suspendTeacherCtrl)
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacherCtrl)
adminRouter.put('/withdraw/teacher/:id', withdrawTeacherCtrl)
adminRouter.put('/unwithdraw/teacher/:id', unwithdrawTeacherCtrl)
adminRouter.put('/publish/examresults/:id', publishExamResultsCtrl)
adminRouter.put('/unpublish/examresults/:id', unpublishExamResultsCtrl)

module.exports = adminRouter;