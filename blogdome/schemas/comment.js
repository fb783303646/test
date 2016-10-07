var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CommentSchema = new Schema({
	article:{type:ObjectId,ref:"article"},
  from:{type:ObjectId,ref:"user"},
  to:{type:ObjectId,ref:"user"},
  content:String,
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


CommentSchema.pre('save', function(next) {
	
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

  next();
});

CommentSchema.statics = {
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


module.exports = CommentSchema;