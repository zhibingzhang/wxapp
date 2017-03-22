var express = require('express')
var crypto = require('crypto')//md5加密
var nodemailer = require('nodemailer')//邮箱验证
var moment = require('moment')//时间处理
var jwt = require('jsonwebtoken')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Movie = require('./models/movie.js')
var Sign = require('./models/sign.js')
var Email = require('./models/email.js')
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
var secretOrPrivatekdy = 'zibinzhang';
app.set('views','views/pages')
app.set('view engine','jade')//设置默认的模板引擎
//定义public路径
app.use(express.static(path.join(__dirname, 'public')))//设置静态目录为pubic
app.use(express.static(path.join(__dirname, 'bower_components')))//设置静态目录为bower_components
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(port)
// 页面路由 index page
app.get('/',function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title: 'ChickenBz-首页',
			movies: movies
		})
	})
})
// 页面路由 detail page
app.get('/movie/:id',function(req, res){
	var id = req.params.id

	// Movie.findById(id, function(err, movie){
	// 	console.log(movie)
	// 	res.render('detail',{
	// 		title: 'nodeweb 详情页',
	// 		movies: [movie]
	// 	})
	// })
})
// 页面路由 admin page
app.get('/admin/movie',function(req, res){
	var token = req.body.token || req.query.token || req.headers.cookie; // 从body或query或者header中获取token
	console.log(secretOrPrivatekdy)
	jwt.verify(token, secretOrPrivatekdy, function (err, decode) {
        if (err) {  //  时间失效的时候/ 伪造的token          
           res.redirect('/sign_in')
        }else{
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
//通过邮箱修改密码
app.get('/email_reset',function(req,res){
	res.render('email_reset',{
		title: '用邮箱重置密码'
	})
})
// 注册
app.post('/sign_up/new', function(req, res){
	var moment_end = moment().unix();
	var vcode = req.body.vcode;
	var email = req.body.email;
	var movieObj = req.body
	var _movie
    Email.findOne({'email': email}).exec(function(err, doc){
		if(err) {
		    return res.serverError(err);
		 }
	  	if(!doc) {
	    	return res.json({
	    		"data":null,
	    		"state": '404',
	    		"message": '验证码输入错误'
	    	})
	  	}
	  	if(doc.startime-moment_end<0){
			return res.json({
				"state":'404',
				"message":'验证码已过期请重新发送'
			})
		}else if(doc.vcode != vcode){
			return res.json({
				"state":'404',
				"message":'验证码输入错误'
			})
		}else{
			_movie = new Sign({
				uname: movieObj.uname,
				phone: movieObj.phone,
				email: movieObj.email,
				vcode: movieObj.vcode,
				password: md5(movieObj.password)
			})
			_movie.save(function(err, Sign){
				if(err){
					console.log(err)
				}
				return res.json({
					"state":'200',
					"message":'表单提交成功'
				})
			})
		}
	})
})
//用户名查询
app.post('/sign_up_uname/new', function(req, res){
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
app.post('/sign_up_email/new', function(req, res){
	var email = req.body.email,movieObj = req.body,_movie,startime = moment().unix()+60,Nnum,id=req.body._id;
	Sign.findOne({'email': email}).exec(function(err, doc){
		if(doc){
			return res.json({
				'state': '404',
				'message': '邮箱已被注册'
			})
		}
		Nnum = random_num();
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
		        return res.json({
			    	"state":'404',
			    	"message":'可能是邮箱不存在'
			    })
		    }
		    return res.json({
		    	"state":'200',
		    	"message":'邮件发送成功'
		    })
		});
		Email.findOne({'email': email}).exec(function(err, doc){
			if (err) {
			    return res.serverError(err);
			}
			if(doc){
				var condition = {'email': email}//更新条件
				var value = {"$set":{'startime': startime, 'vcode': Nnum}}//更新值
				Email.update(condition,value,function(err){
					if(err){
						return res.serverError(err)
					}
					return res.json({
				    	"state":'200',
				    	"message":'邮箱注册成功'
				    })
				})
			}else{
				_movie = new Email({
					email: movieObj.email,
					startime: startime,
					vcode: Nnum
				})
				_movie.save(function(err, Email){
					if(err){
						console.log(err)
					}
					return res.json({
				    	"state":'200',
				    	"message":'邮箱注册成功'
				    })
				})
			}
		})
	})
})
//邮箱验证reset
app.post('/sign_up_email_reset/new', function(req, res){
	var email = req.body.email,movieObj = req.body,_movie,startime = moment().unix()+60,Nnum,id=req.body._id;
	Sign.findOne({'email': email}).exec(function(err, doc){
		if(!doc){
			return res.json({
				'state': '404',
				'message': '此邮箱不存在'
			})
		}
		Nnum = random_num();
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
		        return res.json({
			    	"state":404,
			    	"message":error
			    })
		    }
		    return res.json({
		    	"state":200,
		    	"message":'邮件发送成功'
		    })
		});
		Email.findOne({'email': email}).exec(function(err, doc){
			if (err) {
			    return res.serverError(err);
			}
			if(doc){
				var condition = {'email': email}//更新条件
				var value = {"$set":{'startime': startime, 'vcode': Nnum}}//更新值
				Email.update(condition,value,function(err){
					if(err){
						return res.serverError(err)
					}
					return res.json({
				    	"state":'200',
				    	"message":'邮箱注册成功'
				    })
				})
			}else{
				_movie = new Email({
					email: movieObj.email,
					startime: startime,
					vcode: Nnum
				})
				_movie.save(function(err, Email){
					if(err){
						console.log(err)
					}
					return res.json({
				    	"state":'200',
				    	"message":'邮箱注册成功'
				    })
				})
			}
		})
	})
})
//登录
app.post('/sign_in/new', function(req, res){
	var en = req.body.en;
	var pwd = md5(req.body.pwd);
    Sign.findOne({"$or":[{'uname': en},{'email': en}], 'password': pwd}).exec(function(err, doc){
    	if (err) {
		    return res.serverError(err);
		}
		if(!doc){
			return res.json({
				'state': '404',
				'message': '用户名或密码错误'
			})
		}

		var content = {
			iss: doc.uname
		}
		var token = jwt.sign(content, secretOrPrivatekdy,{
			expiresIn: 60*60*24
		})

		console.log(doc)
		return res.json({
			'state': '200',
			'message': '',
			'token': token,
			'doc': doc
		})
	})
})
//用邮箱重置密码
app.post('/email_reset/new',function(req, res){
	console.log(req.body)
	var moment_end = moment().unix();
	var vcode = req.body.vcode
	var email = req.body.email
	var password = md5(req.body.password)
	Email.findOne({'email': email}).exec(function(err, doc){
		if(err) {
		    return res.serverError(err);
		 }
	  	if(!doc) {
	    	return res.json({
	    		"data":null,
	    		"state": '404',
	    		"message": '验证码输入错误'
	    	})
	  	}
	  	if(doc.startime-moment_end<0){
			return res.json({
				"state":'404',
				"message":'验证码已过期请重新发送'
			})
		}else if(doc.vcode != vcode){
			return res.json({
				"state":'404',
				"message":'验证码输入错误'
			})
		}else{
			var condition = {'email': email}//更新条件
			var value = {"$set":{'password': password}}//更新值
			Sign.update(condition,value,function(err){
				if(err){
					return res.serverError(err)
				}
				return res.json({
					'state': '200',
					'message': '密码重置成功'
				})
			})
		}
	})
})
// md5加密
function md5(object){
	return crypto.createHash('md5')
				 .update(object,'utf8')
				 .digest('hex');
}
//HMACSHA256 加密算法
function HMACSHA256(object, secret){
	return crypto.createHmac('sha256', secret)
                 .update(object, 'utf8')
                 .digest('hex');
}
// 随机生成一个6位数字
function random_num(){
	for(var i=0,Num='';i<6;i++){ 
		Num+=Math.floor(Math.random()*10); 
	} 
	return Num;
}