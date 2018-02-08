var PostModel = require('../../models/post');

class Post {
    async GetPosts(req, res, next) {
        try {

            res.status(200).send({
                ok: true,
                data: data,
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Post_GetPosts_FAILED',
                data: err,
            });
        }
    }
    async AddPost(req, res, next) {
        try {

            res.status(200).send({
                ok: true,
                data: "新增文章成功!",
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Post_AddPost_FAILED',
                data: err,
            });
        }
    }
    async UpdatePost(req, res, next) {
        try {

            res.status(200).send({
                ok: true,
                data: "修改文章成功！",
            });
        } catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Post_UpdatePost_FAILED',
                data: err,
            });
        }
    }
}

module.exports = new Post();
