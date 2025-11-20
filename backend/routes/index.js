const routerx = require('express-promise-router');
const paymentRouter = require('./paymentRouter');
const authRouter = require('./authRouter');
const adminRouter = require('../admin/routes/index');
const Router = routerx();

Router.use('/api/v0/payment', paymentRouter);
Router.use('/api/auth', authRouter);
Router.use('', adminRouter);

module.exports = Router;