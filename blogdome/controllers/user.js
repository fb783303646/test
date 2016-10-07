var User = require('../models/user');
  //注册
exports.showSignup=function (req, res) {
    res.render('signup', { title: '注册' });
}; 

exports.signup=function (req, res) {

    var getData = {
      name : req.body.name,
      password:req.body.password,
      email:req.body.email
    }
    var _user;

    User.findOne({name:getData.name},function(err,name){
      if(err){console.log(err)}
      if(name){
        console.log('该用户已经被注册');
        res.redirect('/signin')
      }else{
        _user = new User(getData);
        _user.save(function(err,user){
          if (err) {console.log(err)}
          res.redirect('/');  
        })
      }
    });
};	


  //登录
exports.showSignin=function (req, res) {
    res.render('signin', { title: '登录' });
};
exports.signin=function (req, res) {
    var getData = {
      name : req.body.name,
      password:req.body.password
    }

    User.findOne({name:getData.name},function(err,user){
      if(err){console.log(err)}
      if(!user){
        console.log('该用户不存在');
        return res.redirect('/')
      }
      user.comparePassword(getData.password,function(err,isMatch){
      
        if(err){console.log(err)}
        if(isMatch){
          req.session.user = user;
          console.log('匹配成功')
          return res.redirect('/')
        }else{
          console.log('没有匹配成功')
        }
      })  
    }); 
};
  //退出
exports.logout=function (req, res) {
    
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');

};