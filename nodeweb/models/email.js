var mongoose = require('mongoose') //加载mongoose模块
var EmailSchema = require('../schemas/email') //引入数据集


var Email = mongoose.model('email', EmailSchema) //编译这个模式

module.exports = Email