import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormHoc from '../../component/form-hoc/form-hoc'

@connect(
	state => state.user,
	{ login }
)
@FormHoc
class Login extends React.Component{

	constructor(){
		super();
		this.state = {
			user:'',
			pwd:''
		};
		this.register = this.register.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	// 输入控件事件
	// handleChange(key, value){
	// 	this.setState({
	// 		// 注意这个中括号
	// 		[key]:value
	// 	});
	// }

	// 点击register按钮
	register(){
		// 跳转
		this.props.history.push('/register');
	}
	// 点击登录
	handleLogin(){
		// this.props.login(this.state);
		this.props.login(this.props.state);
	}

  render(){
    return (
    	<div>
				{ this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
    		<Logo />
				<WingBlank>
	    		<List>
						{ this.props.msg?<p className="error-msg">{this.props.msg}</p>:null }
	    			<InputItem onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
	    			<WhiteSpace />
	    			<InputItem type="password" onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
	    		</List>
	    		<WhiteSpace />
	    		<Button type="primary" onClick={this.handleLogin}>登录</Button>
	    		<WhiteSpace />
	    		<Button type="primary" onClick={this.register}>注册</Button>
				</WingBlank>
			</div>
    );

  }
}

export default Login;
