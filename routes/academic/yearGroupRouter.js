const express = require("express");
const {
    createYearGroupCtrl,
    getYearGroupsCtrl,
    getYearGroupCtrl,
    updateYearGroupCtrl,
    deleteYearGroupCtrl
} = require("../../controller/academics/yearGroupCtrl");
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const yearGroupRouter = express.Router();

yearGroupRouter.route('/').get(isLogin, isAdmin, getYearGroupsCtrl).post(isLogin, isAdmin, createYearGroupCtrl);
yearGroupRouter.route('/:id').get(isLogin, isAdmin, getYearGroupCtrl).put(isLogin, isAdmin, updateYearGroupCtrl).delete(isLogin, isAdmin, deleteYearGroupCtrl);

module.exports = yearGroupRouter;