var express = require('express');
var path = require('path');
var session = require('express-session');
var mongo = require('./lib/mongo');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');
var winston = require('winston');
var expressWinston = require('express-winston');
var app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    next();
});

//设置模板目录和模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
MongoStore
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}));

//flash
app.use(flash());

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}

//logs
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));
routes(app);
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));

app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});

module.exports = app;
