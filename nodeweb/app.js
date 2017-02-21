var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Movie = require('./models/movie.js')
var _= require('underscore')
var port = process.env.PORT || 80
var app = express()

// 使用 mongoose 链接数据库 
var db=mongoose.connect('mongodb://127.0.0.1:12345/test')
	db.connection.on("error", function(error){
		console.log('数据库连接失败')
	});
	db.connection.on("open", function(){
		console.log('数据库连接成功')
	})

app.set('views','views/pages')
app.set('view engine','jade')//设置默认的模板引擎
//定义public路径
app.use(express.static(path.join(__dirname, 'public')))//设置静态目录为pubic
app.use(express.static(path.join(__dirname, 'bower_components')))//设置静态目录为bower_components
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(port)



console.log('nodeweb started on port '+port)

// 页面路由 index page
app.get('/',function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		console.log(movies)
		res.render('index',{
			title: 'ChickenBz-首页',
			movies: movies
		})
	})
})
// 页面路由 detail page
app.get('/movie/:id',function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		console.log(movie)
		res.render('detail',{
			title: 'nodeweb 详情页',
			movies: [movie]
		})
	})
})
// 页面路由 admin page
app.get('/admin/movie',function(req, res){
	res.render('admin',{
		title: 'nodeweb 后台录入页',
		movie: {
			title: '',
			author: '',
			content: '',
			time: '',
			img: ''
		}
	})
})
//admin update movid
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if(id){
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: 'nodeweb 后台更新页',
				movie: movie
			})
		})
	}
})
//admin post movie
app.post('/admin/movie/new', function(req, res){
	var id = req.body['movie[_id]']
	var movieObj = req.body
	var _movie
	if(id != undefined){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			}
			_movie = _.extend(movie, movieObj)

			_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie' + movie._id)
			})
		})
	}else{
		_movie = new Movie({
			title: movieObj.title,
			author: movieObj.author,
			content: movieObj.content,
			time: movieObj.time,
			img: movieObj.img,
		})
		console.log(_movie)
		_movie.save(function(err, movie){
			if(err){
					console.log(err)
			}
			res.redirect('/movie/' + movie._id)
		})
	}

})
// 页面路由 list page
app.get('/admin/list',function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		console.log(movies)
		res.render('list',{
			title: 'nodeweb 列表页',
			movies: movies
		})
	})
})