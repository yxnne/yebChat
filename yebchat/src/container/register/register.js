import React from 'react';
import Logo from '../../component/logo/logo';
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class Register extends React.Component{

	constructor(){
		super();
		this.state = {
			user:'',
			pwd:'',
			repeatPwd:'',
			type:'g' // user type
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	// 输入控件
	handleChange(key, value){
		this.setState({
			// 注意这个中括号
			[key]:value
		});
	}

	// 点击注册按钮处理逻辑
	handleRegister(){
		console.log(this.state);
	}

  render(){

    return (
    	<div>
    		<Logo />
    		<h2>注册页面(Temp Mark)</h2>
				<WingBlank>
	    		<List>
						{/* user name */}
	    			<InputItem onChange={v => this.handleChange('user',v)}>用户</InputItem>
	    			<WhiteSpace />

						{/* password */}
	    			<InputItem type="password" onChange={v => this.handleChange('pwd',v)}>密码</InputItem>
	    			<WhiteSpace />
	    			<InputItem type="password" onChange={v => this.handleChange('repeatPwd',v)}>确认密码</InputItem>
	    			<WhiteSpace />

						{/* radio */}
	    			<RadioItem checked={this.state.type==='g'}
							onChange={v => this.handleChange('type','g')}>G</RadioItem>
	    			<RadioItem checked={this.state.type==='b'}
							onChange={v => this.handleChange('type','b')}>B</RadioItem>
	  			</List>

					{/* submit */}
	  			<Button type="primary" onClick={v => this.handleRegister()}>注册</Button>
			</WingBlank>
			</div>
    );
  }
}

export default Register;
