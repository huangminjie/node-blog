var TypeModel = require('../../models/type');

class Type {
    async GetTypes(req, res, next) {
        try {
            const types = await TypeModel.find({}).exec();
            if (!Array.isArray(types)) {
                types = [];
            }
            res.status(200).send({
                ok: true,
                data: types,
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Type_GetTypes_FAILED',
                data: err,
            });
            return false;
        }
    }
    async AddType(req, res, next) {
        try {
            TypeModel.create({
                name: req.fields.name,
                status: req.fields.status
            }, (err, type) => {
                if (err) {
                    res.status(500).send({
                        ok: false,
                        type: 'Type_AddTypes_FAILED',
                        data: err,
                    });
                }
                else {
                    res.status(200).send({
                        ok: true,
                        data: "新增分类成功!",
                    });
                }
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Type_AddTypes_FAILED',
                data: err,
            });
            return false;
        }
    }
}

module.exports = new Type();