var express = require('express');
var Post = require('../controller/post/post');
var router = express.Router();

router.get('/', Post.GetPostsInfo);
router.get('/:id/text', Post.GetPostText);
router.post('/', Post.AddPost);
router.patch('/:id', Post.UpdatePost);

module.exports = router;