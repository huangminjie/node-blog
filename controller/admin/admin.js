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
            res.status(200).send({
                ok: false,
                type: 'ADMIN_LOGIN_PARAM',
                data: err.message,
            });
            return false;
        }
        try {
            var newPsd = sha1(password);
            const admin = await AdminModel.findOne({ user_name }).exec();
            if (!admin) {
                // var newAdmin = {
                //     user_name,
                //     password: newPsd,
                //     avatara: '',
                //     description: ''
                // };
                // AdminModel.create(newAdmin);
                // req.session.admin = newAdmin;
                // res.status(200).send({
                //     ok: true,
                //     data: '注册管理员成功'
                // });
                res.status(200).send({
                    ok: false,
                    type: 'ADMIN_LOGIN_PARAM',
                    data: '用户名或密码输入错误',
                });
            }
            else if (newPsd !== admin.password) {
                res.status(200).send({
                    ok: false,
                    type: 'ADMIN_LOGIN_PARAM',
                    data: '用户名或密码输入错误',
                });
            }
            else {
                req.session.admin = admin;
                res.status(200).send({
                    ok: true,
                    data: '登录成功'
                });
            }
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'ADMIN_LOGIN_FAILED',
                data: err,
            });
            return false;
        }
    }
}

module.exports = new Admin();