var express = require('express')
var crypto = require('crypto')//md5加密
var nodemailer = require('nodemailer')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Movie = require('./models/movie.js')
var Sign = require('./models/movie.js')
var _= require('underscore')
var port = process.env.PORT || 80
var app = express()

// 使用 mongoose 链接数据库 
var db=mongoose.connect('mongodb://127.0.0.1:12345/blog')
	db.connection.on("error", function(error){
		console.log('数据库连接失败')
	});
	db.connection.once("open", function(){
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
	var id = req.body._id
	var movieObj = req.body
	var _movie
	console.log(req)
	//if(id != 'undefined'){
		// Movie.findById(id, function(err, movie){
		// 	if(err){
		// 		console.log(err)
		// 	}
		// 	_movie = _.extend(movie, movieObj)

		// 	_movie.save(function(err, movie){
		// 		if(err){
		// 			console.log(err)
		// 		}
		// 		res.redirect('/movie' + movie._id)
		// 	})
		// })
	// }else{
	// 	_movie = new Movie({
	// 		title: movieObj.title,
	// 		author: movieObj.author,
	// 		content: movieObj.content,
	// 		time: movieObj.time,
	// 		img: movieObj.img,
	// 	})
	// 	_movie.save(function(err, movie){
	// 		if(err){
	// 			console.log(err)
	// 		}
	// 		res.redirect('/movie/' + movie._id)
	// 	})
	// }
})
// 注册页面
app.post('/sign_in/new', function(req, res){
	var movieObj = req.body
	var _movie
	_movie = new Movie({
		uname: movieObj.uname,
		phone: movieObj.phone,
		password: md5(movieObj.password)
	})
	_movie.save(function(err, Sign){
		if(err){
			console.log(err)
		}
		res.redirect('/sign_in')
	})
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
//注册页面
app.get('/sign_up',function(req, res){
	res.render('sign_up',{
		title: '注册'
	})
})
//登录页面
app.get('/sign_in',function(req, res){
	res.render('sign_in',{
		title: '登录'
	})
})
//用户名查询
app.post('/sign_in_uname/new', function(req, res){
	var uname = req.body.uname;
	Sign.findOne({'uname': uname}).exec(function(err, doc){
		if (err) {
		    return res.serverError(err);
		 }
	  	if (!doc) {

	    	return res.json({
	    		"data":null,
	    		"state": 404,
	    		"message": ''
	    	});
	  	}
	  	return res.json({
	  		"data": doc.uname,
	  		"state": 200,
	  		"message": '用户名已存在！'
	  	});
	})
})
//邮箱验证
app.post('/sign_in_email/new', function(req, res){
	var email = req.body.email;
	
	// 随机生成一个6位数字
	function random_num(){
		for(var i=0,Num='';i<6;i++){ 
			Num+=Math.floor(Math.random()*10); 
		} 
		return Num;
	}
	var Nnum = random_num();
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'qq',
	    auth: {
	        user: '466163792@qq.com',
	        pass: 'aptgrixegofwbifg'
	    }
	});

	// setup email data with unicode symbols
	var mailOptions = {
	    from: '<466163792@qq.com>', // sender address
	    to: '<'+email+'>', // list of receivers
	    subject: 'ChickenBz-邮箱验证', // Subject line
	    text: '保管好你的邮箱验证码', // plain text body
	    html: '<table width="700" border="0" cellpadding="0" cellspacing="0"><tr><td height="122" style="font-family: 微软雅黑; font-size: 14px; ">尊敬的xxx,您好</td></tr><tr><td style="font-family: 微软雅黑; font-size: 14px; ">请妥善保管好你的验证密码哦o.o</td></tr><tr><td height="60" style="font-family: 微软雅黑; font-size: 14px; font-weight: bold;">'+Nnum+'</td></tr><tr><td style="font-family: 微软雅黑; font-size: 14px; ">为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。如果您并未尝试激活邮箱，请忽略本邮件，由此给您带来的不便请谅解。</td></tr><tr><td style="font-family: 微软雅黑; font-size: 14px; padding-top: 80px;">本邮件由系统自动发出，请直接回复！</td> </tr></table>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});
})

// md5加密
function md5(str){
	return crypto.createHash('md5').update(str,'utf8').digest('hex');
}