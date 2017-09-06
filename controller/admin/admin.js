var sha1 = require('sha1');
var AdminModel = require('../../models/admin');

class Admin {
    async login(req, res, next) {
        var { user_name, password } = req.fields;
        try {
            if (!user_name) {
                throw new Error('用户名参数错误!');
            }
            if (!password) {
                throw new Error('密码参数错误!');
            }
        }
        catch (err) {
            res.send({
                status: 0,
                type: 'ADMIN_LOGIN_PARAM',
                message: err.message,
            });
            return false;
        }
        try {
            var newPsd = sha1(password);
            const admin = await (AdminModel.findOne({ user_name }).exec());
            if (err) {
                res.res.sendStatus({
                    status: 0,
                    type: 'ADMIN_LOGIN_FAILED',
                    message: err,
                });
                return false;
            }
            if (!admin) {
                var newAdmin = {
                    user_name,
                    password: newPsd,
                    avatara: '',
                    description: ''
                };
                AdminModel.create(newAdmin);
                req.session.admin = newAdmin;
                res.send({
                    status: 1,
                    success: '注册管理员成功',
                });
                // res.send({
                //     status: 0,
                //     type: 'ADMIN_LOGIN_PARAM',
                //     message: '用户名或密码输入错误',
                // });
            }
            else if (newPsd !== admin.password) {
                res.send({
                    status: 0,
                    type: 'ADMIN_LOGIN_PARAM',
                    message: '用户名或密码输入错误',
                });
            }
            else {
                req.session.admin = admin;
                res.send({
                    status: 1,
                    success: '登录成功'
                });
            }
        }
        catch (err) {
            res.send({
                status: 0,
                type: 'ADMIN_LOGIN_FAILED',
                message: err,
            });
            return false;
        }
    }
}

module.exports = new Admin();