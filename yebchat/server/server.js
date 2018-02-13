// 先测试下服务器
const express = require('express');
// 引入user
const userRouter = require('./user');

// new app
const app = express();
//开启路由中间件
app.use('/user', userRouter);


app.listen(9090, ()=>{
  console.log('testing app server is started..express is in using');
});

// 测试
app.get('/json', (req, rsp) =>{
  rsp.json({
    using:'test',

    time:new Date()
  });
});
