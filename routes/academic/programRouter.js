const express = require("express");
const {
    createProgramCtrl,
    getProgramsCtrl,
    getProgramCtrl,
    updateProgramCtrl,
    deleteProgramCtrl  
} = require("../../controller/academics/programCtrl");
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const programRouter = express.Router();

programRouter.route('/').post(isLogin, isAdmin, createProgramCtrl).get(isLogin, isAdmin, getProgramsCtrl);
programRouter.route('/:id').get(isLogin, isAdmin, getProgramCtrl).put(isLogin, isAdmin, updateProgramCtrl).delete(isLogin, isAdmin, deleteProgramCtrl);

module.exports = programRouter;