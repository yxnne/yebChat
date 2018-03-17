import io from 'socket.io-client';
import axios from 'axios';
// 链接 后台socket，使用 ws:web socket 协议
const socket = io('ws://localhost:9090');

const MSG_LIST = 'MSG_LIST';  // 聊天列表
const MSG_RECV = 'MSG_RECV';  // 读取
const MSG_READ = 'MSG_READ';  // 已读

// 初始状态
const initState = {
  chatmsg:[],
  unread:0
};

// reducer
export function chat(state=initState, action){
  switch(action.type){
    case MSG_LIST:
      return {...state, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read).length};
    case MSG_RECV:
      return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread+1};
    case MSG_READ:
    default:
      return state;
  }
}

//Action creator
function msgList(msgs){
  return {type:MSG_LIST, payload: {msgs}};
}

function msgRecv(msg,userid){
	return { type:MSG_RECV, payload:msg}
}

// 得到消息列表
export function getMsgList(){
  return dispatch=>{
    axios.get('/user/getMsgList')
    .then(res=>{
      //console.log('res is', res );
      if (res.status == 200 && res.data.code == 0){
        console.log('res.data.msgs is', res.data.msgs);
        dispatch(msgList(res.data.msgs));
      }
    });
  }
}
// 发送信息
export function sengMsg({from, to, msg}){
  return dispatch =>{
    socket.emit('sendmsg', {from, to, msg});
  };
}

// 接受消息
export function recvMsg(){
  return dispatch=>{
    socket.on('recvmsg', function(data){
      console.log('recvmsg', data);
      dispatch(msgRecv(data));
    })
  }
}
