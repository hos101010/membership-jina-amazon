//connection 끊어주기

var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var dbconfig = require('../config/databases.js');
var connection = mysql.createConnection(dbconfig);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  done(null, user); // 여기의 user가 req.user가 됨
});



passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: true,
},
  function (req, id, pw, done) {
    connection.query(`SELECT * FROM users WHERE id = ?;`,id, function (err, result) {
      if (err) {
        console.log('err :' + err);
        return done(false, null);
      } else {
        if (result.length === 0) {
          console.log('해당 유저가 없습니다');
          return done(false, null);
        } else {
          if (pw != result[0].pw) {
            console.log('패스워드가 일치하지 않습니다');
            return done(false, null);
          } else {
            console.log('로그인 성공');
            return done(null, {
              id: result[0].id,
              privilege: result[0].privilege
            });
          }
        }
      }
    })
  }));

router.use('/sign_in', function (req, res, next) {
  res.render('login');
});



router.use('/check_user', function(req, res, next){
  passport.authenticate(`local`, function(err, user){
    if (user.id){
      req.session.user = {id : user.id, privilege: user.privilege};
      res.json({page:'/main', id: user.id});
    }
    else {
      res.json({msg:'아이디 또는 비밀번호가 틀렸습니다.'});
    }
  })(req, res, next);}
);

router.use('/signout', (req, res) => {
  delete req.session.user;
  req.session.save(() => {
    res.json({page: '/main'});
  });
});

router.use('/admin', (req, res) => {
  connection.query(`SELECT * FROM users`, function (err, result) {
    if (err) {
      console.log('err :' + err);
      return;
    } else {
      res.render('admin_privilege',{users : result});
    }
  });
});

router.use('/check_admin', (req, res) => {
  connection.query(`SELECT * FROM users WHERE id='${req.session.user.id}'`, function (err, result) {
    if (result[0].privilege == 'user') {
      res.json({msg : 'fail'});
      return;
    }
    res.json({msg : 'pass'});
  });
});


router.use('/update_privilege', (req, res) => {
  let users = req.body.id;
  users.forEach(element => {
    connection.query(`UPDATE users SET privilege='admin' WHERE id='${element}'`);
  });
  res.json({msg: '권한 부여가 완료되었습니다.'});
});

router.use('/delete_privilege', (req, res) => {
  let users = req.body.id;
  users.forEach(element => {
    connection.query(`update users set privilege='user' where id='${element}'`);
  });
  res.json({msg: '권한 취소가 완료되었습니다.'});
});


router.use('/item', (req, res) => {
  res.render('admin_item');
});

module.exports = router;