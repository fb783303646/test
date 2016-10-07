var Article = require('../models/article');
var _ = require('underscore');

//详情
exports.detil=function (req, res) {
    var id = req.params.id;
    Article.findById(id,function(err,article){
        if(err){
          console.log("err"+err);
        }
        res.render('detils', {
          title: '详情',
          articles:article,
          time:date(article.meta.updateAt)
        });
    });
};

// 录入页面
exports.admin=function (req, res) {
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
};

  // 录入数据 
exports.adminPost=function (req, res) {
   		
   	var getData = {
        Id:req.body._id[0],
        RelationId:req.session.user._id,
        title:req.body.title,
        doctor:req.body.doctor,
        summary:req.body.summary,
        poster:req.body.poster,
        describe:req.body.describe,
        year:req.body.year
    };

   	var _Article;
     
  if(getData.Id){
    
    Article.findById(getData.Id,function(err,article){
      _Article = _.extend(article,getData);
      _Article.save(function(err,article){
        if(err){
          console.log("err"+err);
        }else{  
          res.redirect('/detils/'+article._id);
        }
      });

   }); 
  }else{
  
    _Article = new Article(getData);
    _Article.save(function(err,article){
      if(err){
        console.log("err"+err);
      }else{  
        res.redirect('/detils/'+article._id);
      }
    });

  } 
};	

  // 更新修改
exports.editor=function (req, res) {
    var id = req.params.id;

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
};

  // 删除数据
exports.del=function (req, res) {
    var id = req.params.id;
    
    if (id) {
      Article.remove({_id: id}, function(err, article) {
        if (err) {
          console.log(err);
          //res.json({success: 0});
        }
        else {
          //res.json({success: 1});
          res.redirect('/');
        }
      });
    }

};


function date(){
     var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth()+1;    
     var date1 = date.getDate(); 
     var hour = date.getHours(); 
     var minutes = date.getMinutes(); 
     var second = date.getSeconds();
    return year+"年"+month+"月"+date1+"日";
}