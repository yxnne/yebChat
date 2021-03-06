import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCards from '../usercards/usercards';

@connect(
  state=>state.chatuser ,
  { getUserList }
)
class BList extends React.Component{

  componentDidMount(){
    // axios.get('/user/list?type=b')
    // .then(res=>{
    //   if (res.data.code==0) {
    //     this.setState({data:res.data.data})
    //   }
    // });
    this.props.getUserList('b');
  }
  render(){
    return (

      <UserCards userList={this.props.userList} />

    );
  }
}

export default BList;
