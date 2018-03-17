const mongoose = require('mongoose');
// 链接mongodb并使用之,ybchat文档
// const DB_URL = 'mongodb://127.0.0.1:27017';
const DB_URL = 'mongodb://127.0.0.1:27017/ybchat'; // test要是没有会新建,test是集合
// mongoose 去链接数据库
mongoose.connect(DB_URL);

// 定义模型
const models = {

  user:{
    'user':{type:String, require:true},
    'pwd':{type:String, require:true},
    'type':{type:String, require:true},
    'avatar':{type:String}, // 头像
    'desc':{type:String},   // 简介
    'title':{type:String},   // 头衔
    // two other props for boss
    'company':{type:String},
    'money':{type:String}
  },
  chat:{
		'chatid':{'type':String, require:true},
		'from':{'type':String,'require':true},
		'to':{'type':String,'require':true},
		'read':{'type':Boolean,default:false},
		'content':{'type':String,'require':true,'default':''},
		'create_time':{'type':Number,'default':Date.now}
	}
};

// 产生模型
for (let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]));
}

// 暴露一个方法 getModel
// 用mongoose.model()方法根据名称返回数据集
module.exports = {
  getModel:function(name){
    return mongoose.model(name);
  }
}
