var mongoose = require('mongoose') //引入mongoose建模模块


var SignSchema = new mongoose.Schema({
	uname: String,
	phone: String,
	email: String,
	vcode: String,
	password: String,
	meta: {
		createAt:{
			type: Date,
			default:Date.now()
		},
		updateAt:{
			type: Date,
			default:Date.now()
		}
	}
})

SignSchema.pre('save', function(next){//每次执行都会调用,时间更新操作
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})



SignSchema.statics = {//查询的静态方法
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = SignSchema
