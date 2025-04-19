const express = require("express");
const {
    createProgramCtrl,
    getProgramsCtrl,
    getProgramCtrl,
    updateProgramCtrl,
    deleteProgramCtrl  
} = require("../../controller/academics/programCtrl");
const isAuth = require('../../middlewares/isAuth');
const Admin = require('../../model/staff/Admin');
const roleRestriction = require('../../middlewares/roleRestriction');
const programRouter = express.Router();

programRouter.route('/').post(isAuth(Admin), roleRestriction('admin'), createProgramCtrl).get(isAuth(Admin), roleRestriction('admin'), getProgramsCtrl);
programRouter.route('/:id').get(isAuth(Admin), roleRestriction('admin'), getProgramCtrl).put(isAuth(Admin), roleRestriction('admin'), updateProgramCtrl).delete(isAuth(Admin), roleRestriction('admin'), deleteProgramCtrl);

module.exports = programRouter;