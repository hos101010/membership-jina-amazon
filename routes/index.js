var express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/main', function (req, res, next) {
  if (req.session.user){
    res.render('carousel', {
                            id : req.session.user.id,
                            privilege: req.session.user.privilege
                          });}
  else
    res.render('carousel', {id: null});
});

module.exports = router;
