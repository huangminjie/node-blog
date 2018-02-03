var express = require('express');
var Type = require('../controller/type/type');
var router = express.Router();

router.get('/', Type.GetTypes);
router.post('/', Type.AddType);

module.exports = router;