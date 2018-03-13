import axios from 'axios';

// chatuser 相关的 ACTION

const USER_LIST = 'USER_LIST';


// 用户的初始状态
const initState = {
  userList:[]
};

// reducer
export function chatuser(state=initState, action){
  switch (action.type) {
    case USER_LIST:
      return {...state, userList:action.payload};

    default:
      return state;
  }
}

// action creator UserList
function userList(data){
  return {type:USER_LIST, payload:data}
}

// 对外暴露 getUserList 获得列表
export function getUserList(type){
  return dispatch=>{
    axios.get('/user/list?type=' + type)
    .then(res=>{
      if (res.data.code==0) {
        // this.setState({data:res.data.data})
        dispatch(userList(res.data.data));
      }
    });
  };
}
