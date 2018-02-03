var express = require('express');
var Admin = require('../controller/admin/admin');
var router = express.Router();

router.post('/login', Admin.Login);

module.exports = router;