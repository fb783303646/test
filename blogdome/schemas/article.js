var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ArticleSchema = Schema({
	title:String,
	doctor:String,
	summary:String,
	poster:String,
  describe:String,
	year:Number,
  RelationId:{
    type: ObjectId,
    ref: 'user'
  },
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
      .find({},null,{ sort: { _id: -1} })
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