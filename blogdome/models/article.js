var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article');
var Article = mongoose.model('article', ArticleSchema);
 console.log('创建表');
module.exports = Article;