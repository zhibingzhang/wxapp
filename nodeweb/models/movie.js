var mongoose = require('mongoose') //加载mongoose模块
var MovieSchema = require('../schemas/movie') //引入数据集

var Movie = mongoose.model('Movie',MovieSchema) //编译这个模式

module.exports = Movie