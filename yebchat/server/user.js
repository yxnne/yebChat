const express = require('express');
const Router = express.Router();
const models = require('./model');
const utility = require('utility');
const _filter = {'pwd':0, '__v':0}; // 定义查询条件的过滤器

// 得到User记录集
const User = models.getModel('user');
const Chat = models.getModel('chat');

// 得到用户聊天数据
Router.get('/getMsgList', function(req, res){
	const user = req.cookies.userid;
	Chat.find({}, function(err, doc){
		if(!err){
			// console.log('msgs is ',doc);
			return res.json({code:0, msgs:doc});
		}
	});
});


// 用户 'list'的路由，根据Type查询类型下的用户
Router.get('/list', function(req, rsp){
	// GET 参数使用 req.query来获得,POST 蚕食是req.body获取
	const type = req.query.type;
	User.find({type}, function(err, doc){
		return rsp.json({code:0, data:doc});
	});
});

// 更新  路由
Router.post('/update', function(req, rsp){
	const userid = req.cookies.userid;
	if (!userid){
		return rsp.json({code:1});
	}
	const body = req.body;
	User.findByIdAndUpdate(userid, body, function(err, doc){
		// 类似展开 ...
		const data = Object.assign({}, {
			user:doc.user,
			type:doc.type
		}, body);
		// 返回
		return rsp.json({code:0, data});
	});
})

// 登录  路由
Router.post('/login', function(req, rsp){
	//console.log(req.body);
	const { user, pwd } = req.body;
	// 拿到post上传信息后，先查询下，因为用户名需要唯一的
	// 第一个参数是查询条件，第二个参数返回时不显示的字段
	User.findOne({user:user, pwd:md5Pwd(pwd)}, _filter, function(err, doc){
		// doc不为空那么就是说存在这个用户名
		if (!doc) {
			return rsp.json({code:1, msg:'用户名或密码错误'});
		}
		// 登录成功设置cookie userid
		rsp.cookie('userid', doc._id);
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
		// User.create()方法拿不到_id, 使用.save方法可以拿到
		const userModel = new User({user:user, pwd:md5Pwd(pwd), type:type});
		userModel.save(function(err, doc){
			if (err) {
				return rsp.json({code:1, msg:'后台错误'});
			}
			const { user, type, _id } = doc;
			rsp.cookie('userid', _id);
			return rsp.json({code:0, data:{ user, type, _id }});
		});
		// User.create({user:user, pwd:md5Pwd(pwd), type:type}, function(err, doc){
		// 	if (err) {
		// 		return rsp.json({code:1, msg:'后台错误'});
		// 	}
    //
		// 	return rsp.json({code:0});
		// });


	});
});

// '/info'的路由
Router.get('/info', (req, rsp) =>{
	// 得到cookie
	// 用户请求的时候是不是携带cookie
	const { userid } = req.cookies;
	if (!userid) {//没有携带cookie，返回失败
		return rsp.json({code:1});
	}
	User.findOne({_id:userid}, _filter, function(err, doc){
		if (err) {
			return rsp.json({code:1, msg:'后台错误'});
		}
		if (doc) {
			return rsp.json({code:0, data:doc});
		}
	});

});

// 工具方法，密文增加复杂度，放置彩虹表暴力破解
// 两层MD5加加盐
function md5Pwd(pwd){
	const salt = 'ybchat_is_good_#@~~6868!';
	return utility.md5(utility.md5(pwd + salt));
}

module.exports = Router;
