var PostModel = require('../../models/post');
var TypeModel = require('../../models/type');

class Post {
    async GetPosts(req, res, next) {
        try {
            var posts = await PostModel.find();
            var data = [];
            if (!Array.isArray(posts)) {
                posts = [];
            }
            else {
                for (let post of posts) {
                    var type = await TypeModel.findById(post.type);
                    data.push({
                        id: post.id,
                        title: post.title,
                        typeText: type !== null ? type.name : "",
                        type: post.type,
                        digest: post.digest,
                        tag: post.tag,
                        text: post.text,
                        create_time: post.create_time.toLocaleDateString() + ' ' + post.create_time.toLocaleTimeString(),
                        status: post.status,
                        statusTex: Post.toPostStatusText(post.status)
                    });
                }
            }
            res.status(200).send({
                ok: true,
                data: data,
            });
        }
        catch (err) {
            res.status(500).send({
                ok: false,
                type: 'Post_GetPosts_FAILED',
                data: err.message
            });
        }
    }
    async AddPost(req, res, next) {
        try {
            await PostModel.create({
                title: req.body.title,
                type: req.body.type,
                digest: req.body.digest,
                tag: req.body.tag,
                text: req.body.text,
                status: 0
            });
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
            var id = req.params.id;
            await PostModel.findByIdAndUpdate(id, {
                title: req.body.title,
                type: req.body.type,
                digest: req.body.digest,
                tag: req.body.tag,
                text: req.body.text
            });
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
    static toPostStatusText(status) {
        switch (status) {
            case 0:
                return "待审核";
            case 1:
                return "已发布";
            default:
                return "";
        }
    }
}

module.exports = new Post();
