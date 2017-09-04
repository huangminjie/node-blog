var AdminModel = require('../../models/admin');

class Admin {
    login(req, res, next) {
        res.send({
            status: 1,
            success: '登录成功'
        })
    }
}

module.exports = new Admin();