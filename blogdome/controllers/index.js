
var Article  = require('../models/article');
//index page
exports.index = function (req, res) {
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
    }); 
};