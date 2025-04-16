const express = require('express');
const morgan = require('morgan');
const {globalErrHandler, notFoundErr} = require('../middlewares/globalErrHandler');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());


//Routes

const adminRouter = require('../routes/staff/adminRouter');
const academicYearRouter = require('../routes/academic/academicYearRouter');
const academicTermRouter = require('../routes/academic/academicTermRouter');
const classLevelRouter = require('../routes/academic/classLevelRouter');
const programRouter = require('../routes/academic/programRouter');
const subjectRouter = require('../routes/academic/subjectRouter');
const yearGroupRouter = require('../routes/academic/yearGroupRouter');
const teacherRouter = require('../routes/staff/teacherRouter');
const examRouter = require('../routes/academic/examRouter');
const studentRouter = require('../routes/staff/studentRouter');
const questionRouter = require('../routes/academic/questionRouter');

app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-levels', classLevelRouter);
app.use('/api/v1/programs', programRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/year-groups', yearGroupRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/exams', examRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/questions',questionRouter);

//Error Middleware
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;