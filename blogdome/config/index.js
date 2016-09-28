
//var mongoose = require('mongoose');

//var User = require('../models/user');
var Article = require('../models/article');

var _ = require('underscore');

module.exports = function(app) {
  
  //首页
  app.get('/', function (req, res) {

    Article
      .find({},null,{ sort: { _id: -1} }).populate('article')
      .exec(function(err, articles) {
        if (err) {
          console.log(err);
        }
        res.render('index', {
          title: '首页',
          articles: articles
        });
        console.log("首页文章列表：");
        console.log(articles);
      }); 

  });

   //注册
  app.post('/user/signup', function (req, res) {
  });	
  //登录
  app.post('/user/signin', function (req, res) {
    res.render('signin', { title: '登录' });
  });

  //详情
  app.get('/detils/:id', function (req, res) {

    var id = req.params.id;

    Article.findById(id,function(err,article){
        if(err){
          console.log("err"+err);
        }
        res.render('detils', {
          title: '详情',
          summary:article.summary,
          id:id
        });
        
    });

  });

  // 录入页面
  app.get('/admin', function (req, res) {
	    res.render('admin', {
		    title: '后台录入页面',
		    article:{
  				title:"",
  				doctor:"",
  				summary:"",
  				poster:"",
          describe:"",
  				year:""
		    }
		});
  });

  // 录入数据 
  app.post('/admin/post', function (req, res) {
   		
   		var getData = {
          Id:req.body._id[0],
          title:req.body.title,
          doctor:req.body.doctor,
          summary:req.body.summary,
          poster:req.body.poster,
          describe:req.body.describe,
          year:req.body.year
      };
   		var _Article;
      console.log('这个body是：');
      console.log(req.body);
      console.log(getData);
      console.log('这个ID是：'+getData.Id);

      if(getData.Id){

        console.log('说明有这条数据，要执行更新保存');
        Article.findById(getData.Id,function(err,article){
          _Article = _.
          Article.save(function(err,article){
            if(err){
              console.log("err"+err);
            }else{  
              res.redirect('/detils/'+article._id);
            }
          });

       }); 
      }else{
        //看看内容是否重复，重复就 
        //if(){}
        console.log('说明my这条数据,就执行存储');
        //console.log(getData.title);

        _Article = new Article(getData);
        _Article.save(function(err,article){
          if(err){
            console.log("err"+err);
          }else{  
            res.redirect('/detils/'+article._id);
          }
        });

      } 
  });	

  // 更新修改
  app.get('/editor/:id', function (req, res) {
      var id = req.params.id;
      console.log("我是"+id);

      if(id){
        Article.findById(id,function(err,article){
          if(err){
            console.log("err"+err);
          }
          res.render('admin', {
            title: '更新修改',
            article:article
          });

          console.log(article);

        });
      }
  });


};
