var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('koostagram Server');
  res.render("index.pug")
});

module.exports = router;
