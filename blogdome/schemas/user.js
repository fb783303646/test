var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	email:String,
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

UserSchema.pre('save',function(next){
	var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }
  bcrypt.hash(user.password, null, null, function (err, hash){
    if (err) {
      return next(err)
    } 
    user.password = hash;
    next()  
  })
});

UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}



module.exports = UserSchema;