const express = require('express');
const morgan = require('morgan');
const {globalErrHandler, notFoundErr} = require('../middlewares/globalErrHandler');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());


//Routes

const adminRouter = require('../routes/staff/AdminRouter');

app.use('/api/v1/admins', adminRouter);

//Error Middleware
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;