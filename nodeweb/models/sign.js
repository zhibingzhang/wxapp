var mongoose = require('mongoose') //加载mongoose模块
var SignSchema = require('../schemas/sign') //引入数据集

var Sign = mongoose.model('user', SignSchema) //编译这个模式

module.exports = Sign
