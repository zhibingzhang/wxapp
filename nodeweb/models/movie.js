var mongoose = require('mongoose') //加载mongoose模块
var MovieSchema = require('../schemas/movie') //引入数据集

var Movie = mongoose.model('article', MovieSchema) //编译这个模式
var Sign = mongoose.model('user', MovieSchema) //编译这个模式

module.exports = Movie
module.exports = Sign