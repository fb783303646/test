var Index = require('../controllers/index')
var User = require('../controllers/user')
var Article = require('../controllers/article');

//var _ = require('underscore');

module.exports = function(app) {
  
  //pre handle user
  app.use(function(req,res,next){

    var _user = req.session.user;

      app.locals.user = _user;

    next();
  });

   //首页
  app.get('/', Index.index);

  //User
  //注册
  app.get('/signup', User.showSignup); 
  app.post('/user/signup', User.signup); 
  //登录
  app.get('/signin', User.showSignin);
  app.post('/user/signin', User.signin);
  //退出
  app.get('/logout',User.logout);

  //Article
  //详情
  app.get('/detils/:id', Article.detil);
  // 录入页面
  app.get('/admin', Article.admin);
  // 录入数据 
  app.post('/admin/post', Article.adminPost); 
  // 更新修改
  app.get('/editor/:id',Article.editor);
  // 删除数据
  app.get('/delete/:id', Article.del);

};
