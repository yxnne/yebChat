import axios from 'axios';
import { getRedirectPath } from '../util';

// user 相关的 reducer
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

// 用户的初始状态
const initState = {
  isAuth:false,
  msg:'',
  user:'',
  pwd:'',
  type:''
};

// reducer
export function user(state=initState, action){
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg:'',redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state;
  }
}

// Action Creator
function registerSuccess(data){
  return {type:REGISTER_SUCCESS, payload:data}
}

function errorMsg(msg){
  return {type:ERROR_MSG, msg:msg}
}

export function register({user, pwd, repeatPwd, type}, action){

  // 校验不通过情况
  if(!user || !pwd || !repeatPwd ){
    return errorMsg("信息输入不完整");
  }
  if(pwd !== repeatPwd){
    return errorMsg("密码不同于确认密码");
  }
  // 校验通过
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
    .then(res => {
      if (res.status == 200 && res.data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  }

}
