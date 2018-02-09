var PostModel = require('../../models/post');
var TypeModel = require('../../models/type');

class Post {
    async GetPosts(req, res, next) {
        try {
            var posts = await PostModel.find({});
            var data = [];
            if (!Array.isArray(posts)) {
                posts = [];
            }
            else {
                posts.forEach((post) => {
                    var type = await TypeModel
                    data.push({
                        id: post.id,
                        title: post.title,
                        type: post,
                        digest: post.digest,
                        tag: post.tag,
                        text: post.text,
                        create_time: post.create_time.toLocaleDateString() + ' ' + post.create_time.toLocaleTimeString(),
                        status: post.status
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
