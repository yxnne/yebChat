// 先测试下服务器
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// new app
const app = express();


//引入socket.io, 关联express
const server = require('http').Server(app);

const io = require('socket.io')(server);
// 监听io链接，来自客户端
io.on('connection', function(socket){
  // console.log('user connected...' );
  // 监听 sendmsg事件
  socket.on('sendmsg', function(data){
    console.log(data); // data 是收到的数据
    // 将recvmsg事件和数据，广播全局
    io.emit('recvmsg', data);
  });
});

// 引入user
const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
//开启路由中间件
app.use('/user', userRouter);


server.listen(9090, ()=>{
  console.log('testing app server is started..express is in using');
});

// 测试
// app.get('/json', (req, rsp) =>{
//   rsp.json({
//     using:'test',
//
//     time:new Date()
//   });
// });
