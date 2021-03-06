
//var mongoose = require('mongoose');

//var User = require('../models/user');
var Article = require('../models/article');

var markdown = require('markdown').markdown;

module.exports = function(app) {
  
  app.get('/', function (req, res) {

    Article
      .find({})
      .exec(function(err, articles) {
        if (err) {
          console.log(err);
        }
        res.render('index', {
          title: '首页',
          articles: articles
        });
      }); 

  });



  app.post('/user/signup', function (req, res) {

   //  var _user = req.body;

   //  console.log(_user);
  	// user = new User(_user);
   //    user.save(function(err, user) {
  	//     if (err) {
  	//       console.log(err);
  	//     }
   //    	console.log('存储成功并跳转');
   //  	});


  });	


  app.post('/user/signin', function (req, res) {
    res.render('signin', { title: '登录' });
  });


  app.get('/detils/:id', function (req, res) {

    var id = req.params.id;
      console.log("我是"+id);
      Article
        .find({articles:id})
        .exec(function(err, article) {
          if (err) {
            console.log(err);
          }
          res.render('detils', {
            title: '详情',
            article:article
          });
        }); 
  });

  app.get('/admin', function (req, res) {
	    res.render('admin', {
		    title: '后台录入页面',
		    article:{
  				title:"",
  				doctor:"",
  				summary:"",
  				poster:"",
  				year:""
		    }
		});
  });

  // 录入数据 
  app.post('/admin/post', function (req, res) {
   		
   		var getData = {
          title:req.body.title,
          doctor:req.body.doctor,
          summary:req.body.summary,
          poster:req.body.poster,
          year:req.body.year
      };
      
   		var _Article;

      _Article = new Article(getData);

   		_Article.save(function(err,article){

   			if(err){
   				console.log("err"+err);
   			}else{
          console.log("我是"+article);
          res.redirect('/');
        }

   		});
  });	

};
