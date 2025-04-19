const express = require("express");
const {
    createClassLevelCtrl,
    getClassLevelsCtrl,
    getClassLevelCtrl,
    updateClassLevelCtrl,
    deleteClassLevelCtrl
    
} = require("../../controller/academics/classLevelCtrl");
const Admin = require('../../model/staff/Admin');
const isAuth = require('../../middlewares/isAuth');
const roleRestriction = require('../../middlewares/roleRestriction');
const classLevelRouter = express.Router();

classLevelRouter.route('/').post(isAuth(Admin), roleRestriction('admin'), createClassLevelCtrl).get(isAuth(Admin), roleRestriction('admin'), getClassLevelsCtrl);
classLevelRouter.route('/:id').get(isAuth(Admin), roleRestriction('admin'), getClassLevelCtrl).put(isAuth(Admin), roleRestriction('admin'), updateClassLevelCtrl).delete(isAuth(Admin), roleRestriction('admin'), deleteClassLevelCtrl);

module.exports = classLevelRouter;