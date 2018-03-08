const express = require('express');
const Router = express.Router();
const models = require('./model');

// 得到User记录集
const User = models.getModel('user');
// 所有用户 'list'的路由
Router.get('/list', function(req, rsp){
	User.find({}, function(err, doc){
		return rsp.json(doc);
	});
});

// 注册的路由
Router.post('/register', function(req, rsp){
	console.log(req.body);
	const { user, pwd, type } = req.body;
	// 拿到post上传信息后，先查询下，因为用户名需要唯一的
	User.findOne({user:user}, function(err, doc){
		// doc不为空那么就是说存在这个用户名
		if (doc) {
			return rsp.json({code:1, msg:'用户已经存在'});
		}
		// 查不到就是合法的
		User.create({user:user, pwd:pwd, type:type}, function(err, doc){
			if (err) {
				return rsp.json({code:1, msg:'后台错误'});
			}

			return rsp.json({code:0});
		});
	});
});

// '/info'的路由
Router.get('/info', (req, rsp) =>{
	return rsp.json({code:1});
});

module.exports = Router;
