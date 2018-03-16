import axios from 'axios';
import { getRedirectPath } from '../util';

// user 相关的 ACTION
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS'; //包括了 login register 和 update成功
const LOGOUT = 'LOGOUT'

// 用户的初始状态
const initState = {
  isAuth:false,
  msg:'',
  user:'',
  //pwd:'',
  type:''
};

// reducer
export function user(state=initState, action){
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg:'',redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload};
    case LOGOUT:
      return {...initState,redirectTo:'/login'};
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state;
  }
}

// Action Creator
// function loginSuccess(data){
//   return {type:LOGIN_SUCCESS, payload:data};
// }

// function registerSuccess(data){
//   return {type:REGISTER_SUCCESS, payload:data};
// }

function authSuccess(data){
  return {type:AUTH_SUCCESS, payload:data};
}

function errorMsg(msg){
  return {type:ERROR_MSG, msg:msg}
}

// 对外暴露一个action creator
export function loadData(userInfo){
  return {type:LOAD_DATA, payload:userInfo}
}
// 对外暴露一个action creator 登出
export function logoutSubmit(data){
  return {type:LOGOUT};
}

// 对外暴露: 更新信息
export function update(data){
  return dispatch => {
    axios.post('user/update', data)
    .then(res=>{
      if (res.status == 200 && res.data.code === 0) {
        dispatch(authSuccess( res.data.data ));
      } else {
        dispatch(errorMsg(res.data.msg));
      }

    });
  }
}

// 对外暴露:Login
export function login({user, pwd}, action){
  // 校验不通过情况
  if(!user || !pwd ){
    return errorMsg("用户名或者密码不能为空");
  }
  // 校验通过
  return dispatch => {
    axios.post('/user/login', { user, pwd })
    .then(res => {
      if (res.status == 200 && res.data.code === 0) {
        dispatch(authSuccess( res.data.data ));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

// 对外暴露:register
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
        dispatch(authSuccess({ user, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };

}
