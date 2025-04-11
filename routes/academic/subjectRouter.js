const express = require("express");
const {
    createSubjectCtrl,
    getSubjectsCtrl,
    getSubjectCtrl,
    updateSubjectCtrl,
    deleteSubjectCtrl
      
} = require("../../controller/academics/subjectCtrl");
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const subjectRouter = express.Router();

subjectRouter.route('/').get(isLogin, isAdmin, getSubjectsCtrl);
subjectRouter.route('/:id').post(isLogin, isAdmin, createSubjectCtrl).get(isLogin, isAdmin, getSubjectCtrl).put(isLogin, isAdmin, updateSubjectCtrl).delete(isLogin, isAdmin, deleteSubjectCtrl);

module.exports = subjectRouter;