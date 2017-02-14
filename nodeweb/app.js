var express = require('express')
var port = process.env.PORT || 3000
var app = express()

//定义public路径
var pub = __dirname + '/public';
app.use(express.static( __dirname + '/public'));//设置静态目录为pubic
app.set('views','views')
app.set('view engine','jade')//设置默认的模板引擎
app.listen(port)



console.log('nodeweb started on port '+port)

// 页面路由 index page
app.get('/',function(req, res){
	res.render('pages/index',{
		title: 'nodeweb 首页'
	})
})
// // 页面路由 detail page
// app.get('/',function(req, res){
// 	res.render('detail',{
// 		title: 'nodeweb 详情页'
// 	})
// })
// // 页面路由 admin page
// app.get('/admin/movie',function(req, res){
// 	res.render('admin',{
// 		title: 'nodeweb 后台录入页'
// 	})
// })
// // 页面路由 list page
// app.get('/admin/list',function(req, res){
// 	res.render('list',{
// 		title: 'nodeweb 列表页'
// 	})
// })