const express = require("express");
const {
    createYearGroupCtrl,
    getYearGroupsCtrl,
    getYearGroupCtrl,
    updateYearGroupCtrl,
    deleteYearGroupCtrl
} = require("../../controller/academics/yearGroupCtrl");
const isAuth = require('../../middlewares/isAuth');
const Admin = require('../../model/staff/Admin');
const roleRestriction = require('../../middlewares/roleRestriction');
const yearGroupRouter = express.Router();

yearGroupRouter.route('/').get(isAuth(Admin), roleRestriction('admin'), getYearGroupsCtrl).post(isAuth(Admin), roleRestriction('admin'), createYearGroupCtrl);
yearGroupRouter.route('/:id').get(isAuth(Admin), roleRestriction('admin'), getYearGroupCtrl).put(isAuth(Admin), roleRestriction('admin'), updateYearGroupCtrl).delete(isAuth(Admin), roleRestriction('admin'), deleteYearGroupCtrl);

module.exports = yearGroupRouter;