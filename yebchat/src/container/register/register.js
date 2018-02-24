import React from 'react';
import Logo from '../../component/logo/logo';
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class Register extends React.Component{

	constructor(){
		super();
		this.state = {
			type:'g' // user type
		};

	}
  render(){

    return (
    	<div>
    		<Logo />
    		<h2>注册页面(Temp Mark)</h2>
				<WingBlank>
	    		<List>
	    			<InputItem>用户</InputItem>
	    			<WhiteSpace />
	    			<InputItem>密码</InputItem>
	    			<WhiteSpace />
	    			<InputItem>确认密码</InputItem>
	    			<WhiteSpace />
	    			<RadioItem checked={this.state.type==='g'}>G</RadioItem>
	    			<RadioItem checked={this.state.type==='b'}>B</RadioItem>
	  			</List>
	  			<Button type="primary">注册</Button>
			</WingBlank>
			</div>
    );
  }
}

export default Register;
