import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/logo';
class Login extends React.Component{

	constructor(){
		super();
		this.register = this.register.bind(this);
	}

	// 点击register按钮
	register(){
		// 跳转
		this.props.history.push('/register');
	}

  render(){
    return (
    	<div>
    		<Logo />
    		<h2>登录页面(Temp Mark)</h2>
    		<List>
    			<InputItem>用户</InputItem>
    			<WhiteSpace />
    			<InputItem>密码</InputItem>
    		</List>
    		<WhiteSpace />
    		<Button type="primary">登录</Button>
    		<WhiteSpace />
    		<Button type="primary" onClick={this.register}>注册</Button>
			</div>
    );
      
  }
}

export default Login;
