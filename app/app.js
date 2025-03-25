const express = require('express');
const morgan = require('morgan');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());


//Routes

const adminRouter = require('../routes/staff/AdminRouter');
//Admin Register
app.use('/api/v1/admins', adminRouter);

module.exports = app;