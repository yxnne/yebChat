// 先测试下服务器
const express = require('express');

// new app
const app = express();

app.listen(9090, ()=>{
  console.log('testing app server is started..express is in using');
});

app.get('/json', (req, rsp) =>{
  rsp.json({
    using:'test',
    time:new Date()
  });
});
