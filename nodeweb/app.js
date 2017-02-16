var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var _= require('underscore')
// var Movie = require('./models/movie.js')
var port = process.env.PORT || 80
var app = express()


// mongoose.connect('mongodb://localhost/nodeweb')

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
	// Movie.fetch(function(err, movies){
	// 	if(err){
	// 		console.log(err)
	// 	}
		res.render('index',{
			title: 'ChickenBz-首页',
			movies: 'movies'
		})
	// })
})
// // // 页面路由 detail page
// app.get('/movie/:id',function(req, res){
// 	var id = req.params.id

// 	Movie.findById(id, function(err, movie){
// 		res.render('detail',{
// 			title: 'nodeweb 详情页'+ movie.title,
// 			movies: movie
// 		})
// 	})
// })
// // // 页面路由 admin page
// app.get('/admin/movie',function(req, res){
// 	res.render('admin',{
// 		title: 'nodeweb 后台录入页',
// 		movie: {
// 			title: '',
// 			doctor: '',
// 			country: '',
// 			year: '',
// 			poster: '',
// 			flash: '',
// 			summary: '',
// 			language: ''
// 		}
// 	})
// })
// //admin update movid
// app.get('/admin/update/:id', function(req, res){
// 	var id = req.params.id

// 	if(id){
// 		Movie.findById(id, function(err, movie){
// 			res.render('admin', {
// 				title: 'nodeweb 后台更新页',
// 				movie: movie
// 			})
// 		})
// 	}
// })
// //admin post movie
// app.post('/admin/movie/new', function(res, req){
// 	var id = req.body.movie._id
// 	var movieObj = req.body.movie
// 	var _movie

// 	if(id !== 'undefined'){
// 		Movie.findById(id, function(err, movie){
// 			if(err){
// 				console.log(err)
// 			}

// 			_movie = _.extend(movie, movieObj)
// 			_movie.save(function(err, movie){
// 				if(err){
// 					console.log(err)
// 				}
// 				res.redirect('/movie' +movie._id)
// 			})
// 		})
// 	}else{
// 		_movie = new Movie({
// 			doctor: movieObj.doctor,
// 			title: movieObj.title,
// 			country: movieObj.country,
// 			language: movieObj.language,
// 			year: movieObj.year,
// 			poster: movieObj.poster,
// 			summary: movieObj.summary,
// 			flash: movieObj.flash
// 		})

// 		_movie.save(function(err, movie){
// 			if(err){
// 					console.log(err)
// 				}
// 				res.redirect('/movie' +movie._id)
// 		})
// 	}

// })
// // 页面路由 list page
// app.get('/admin/list',function(req, res){
// 	Movie.fetch(function(err, movies){
// 		if(err){
// 			console.log(err)
// 		}
// 		res.render('list',{
// 			title: 'nodeweb 列表页',
// 			movies: movies
// 		})
// 	})
// })