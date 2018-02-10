var admin = require('./admin');
var type = require('./type');
var post = require('./post');

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render('index');
    });
    app.use('/admin', admin);
    app.use('/posts', post);
    app.use('/types', type);
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};