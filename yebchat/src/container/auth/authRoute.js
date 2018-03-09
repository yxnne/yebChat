import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';

@withRouter
@connect(
	null,
	{ loadData }
)
class AuthRoute extends React.Component{

	componentDidMount(){
		// 获取当前页面的路由地址
		// 如果是/login 或者 /register中的一个, 不进行处理
		// 否则先去后台验证用户
		const publicList = ['/login', '/register'];
		const pathname = this.props.location.pathname;
		if (publicList.indexOf(pathname) > -1 ) {
			return null;
		}

		// 获取登录信息
		axios.get('user/info')
		.then(res =>{
			if (res.status === 200){

				if (res.data.code == 0 ) {
					// 有登录信息
					// 设置信息到redux中
					this.props.loadData(res.data.data);

				} else {
					this.props.history.push('/login');
				}
			}
		});
		// 是否登录
		// 现在的url 是login 或者register不用跳转

		// 用户身份

		// 完善信息
	}

	render(){
		return (
			null
		);
	}
}

export default AuthRoute;
