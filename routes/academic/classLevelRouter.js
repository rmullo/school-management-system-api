const express = require("express");
const {
    createClassLevelCtrl,
    getClassLevelsCtrl,
    getClassLevelCtrl,
    updateClassLevelCtrl,
    deleteClassLevelCtrl
    
} = require("../../controller/academics/classLevelCtrl");
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const classLevelRouter = express.Router();

classLevelRouter.route('/').post(isLogin, isAdmin, createClassLevelCtrl).get(isLogin, isAdmin, getClassLevelsCtrl);
classLevelRouter.route('/:id').get(isLogin, isAdmin, getClassLevelCtrl).put(isLogin, isAdmin, updateClassLevelCtrl).delete(isLogin, isAdmin, deleteClassLevelCtrl);

module.exports = classLevelRouter;