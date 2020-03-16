var express = require('express');
var router = express.Router();

var GraphRoutes= require('../controllers/graph');

router.post('/graph/view' , GraphRoutes.getReport);

module.exports = router;
