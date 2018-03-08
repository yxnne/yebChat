const express = require('express');
const Router = express.Router();
const models = require('./model');
const utility = require('utility');

// 得到User记录集
const User = models.getModel('user');
// 所有用户 'list'的路由
Router.get('/list', function(req, rsp){
	User.find({}, function(err, doc){
		return rsp.json(doc);
	});
});

// 登录  路由
Router.post('/login', function(req, rsp){
	console.log(req.body);
	const { user, pwd } = req.body;
	// 拿到post上传信息后，先查询下，因为用户名需要唯一的
	// 第一个参数是查询条件，第二个参数返回时不显示的字段
	User.findOne({user:user, pwd:md5Pwd(pwd)}, {'pwd':0}, function(err, doc){
		// doc不为空那么就是说存在这个用户名
		if (!doc) {
			return rsp.json({code:1, msg:'用户名或密码错误'});
		}
		return rsp.json({code:0, data:doc});

	});
});

// 注册  路由
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
		// 密码加密了
		User.create({user:user, pwd:md5Pwd(pwd), type:type}, function(err, doc){
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

// 工具方法，密文增加复杂度，放置彩虹表暴力破解
// 两层MD5加加盐
function md5Pwd(pwd){
	const salt = 'ybchat_is_good_#@~~6868!';
	return utility.md5(utility.md5(pwd + salt));
}

module.exports = Router;
