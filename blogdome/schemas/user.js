var mongoose = require('mongoose');

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

UserSchema.pre('save',function(err,next){
	console.log('333');
	if (err) {
        console.log(err);
        return;
    }
    console.log('meow');
    
    next();
});



module.exports = UserSchema;