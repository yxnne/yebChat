import React from 'react';
import axios from 'axios';

class AuthRoute extends React.Component{


	componentDidMount(){
		// 获取登录信息
		axios.get('user/info')
		.then(res =>{
			if (res.status === 200){
				console.log(res.data);
			}
		});
		// 是否登录
		// 现在的url 是login 或者register不用跳转

		// 用户身份

		// 完善信息
	}

	render(){
		return (
			<h1>验证页面</h1>
		);
	}
}

export default AuthRoute;
