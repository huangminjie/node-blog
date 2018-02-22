var TypeModel = require('../../models/type');

class Type {
    async GetTypes(req, res, next) {
        try {
            var types = await TypeModel.find({});
            var data = [];
            if (!Array.isArray(types)) {
                types = [];
            }
            else {
                types.forEach((type) => {
                    data.push({
                        id: type.id,
                        name: type.name,
                        create_time: type.create_time.toLocaleDateString() + ' ' + type.create_time.toLocaleTimeString(),
                        status: type.status
                    });
                });
            }
            res.status(200).send({
                ok: true,
                data: data,
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Type_GetTypes_FAILED',
                data: err,
            });
        }
    }
    async AddType(req, res, next) {
        try {
            await TypeModel.create({
                name: req.body.name,
                status: req.body.status
            });
            res.status(200).send({
                ok: true,
                data: "新增分类成功!",
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Type_AddTypes_FAILED',
                data: err,
            });
        }
    }
    async UpdateType(req, res, next) {
        try {
            var id = req.params.id;
            await TypeModel.findByIdAndUpdate(id, {
                name: req.body.name,
                status: req.body.status
            });
            res.status(200).send({
                ok: true,
                data: "修改分类成功！",
            });
        } catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Type_UpdateType_FAILED',
                data: err,
            });
        }
    }
}

module.exports = new Type();
