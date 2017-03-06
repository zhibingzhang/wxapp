var mongoose = require('mongoose') //引入mongoose建模模块


var EmailSchema = new mongoose.Schema({
	email: String,
	startime: Number,
	vcode: String,
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

EmailSchema.pre('save', function(next){//每次执行都会调用,时间更新操作
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})


EmailSchema.statics = {//查询的静态方法
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
module.exports = EmailSchema