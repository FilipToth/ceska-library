const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/index');
const app = express();

// setup cors
app.use(cors({
    origin: '*',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// JWT validation
const validationMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.send({ success: false });
        return;
    }

    // remove scheme
    const parts = authorization.split(' ');
    if (parts != 2) {
        res.send({ success: false });
        return;
    }

    let success = false;
    const token = parts[1];
    await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log(err);
            return;
        }
    
        if (decoded.username == undefined || decoded.username == '')
            return;
    
        success = true;
    });
    
    if (!success)
        res.send({ success: false });
    else
        next();
};

app.use('/auth', validationMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
