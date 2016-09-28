var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	title:String,
	doctor:String,
	summary:String,
	poster:String,
  describe:String,
	year:Number,
	meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

console.log("创建骨架");
ArticleSchema.pre('save', function(next) {
	
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

  next();
});

ArticleSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};


module.exports = ArticleSchema;