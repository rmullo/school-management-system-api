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

app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);

//Error Middleware
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;