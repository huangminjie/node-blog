var admin = require('./admin');

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render('index');
    });
    app.use('/admin', admin);
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};