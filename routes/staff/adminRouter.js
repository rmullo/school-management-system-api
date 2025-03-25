const express = require("express");
const {
    registerAdmCtrl, 
    loginAdmCtrl, 
    getAllAdmCtrl, 
    getSingleAdmCtrl, 
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
const adminRouter = express.Router();

adminRouter.post('/register', registerAdmCtrl)
adminRouter.post('/login', loginAdmCtrl)
adminRouter.get('/', getAllAdmCtrl)
adminRouter.get('/:id',isLogin, getSingleAdmCtrl)
adminRouter.put('/:id', updateAdmCtrl)
adminRouter.delete('/:id', deleteAdmCtrl)
adminRouter.put('/suspend/teacher/:id', suspendTeacherCtrl)
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacherCtrl)
adminRouter.put('/withdraw/teacher/:id', withdrawTeacherCtrl)
adminRouter.put('/unwithdraw/teacher/:id', unwithdrawTeacherCtrl)
adminRouter.put('/publish/examresults/:id', publishExamResultsCtrl)
adminRouter.put('/unpublish/examresults/:id', unpublishExamResultsCtrl)

module.exports = adminRouter;