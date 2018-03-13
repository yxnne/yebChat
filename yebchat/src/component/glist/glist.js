import React from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCards from '../usercards/usercards';

@connect(
  state=>state.chatuser ,
  { getUserList }
)
class GList extends React.Component{

  componentDidMount(){

    this.props.getUserList('g');
  }
  render(){

    return (

      <UserCards userList={this.props.userList} />

    );
  }
}

export default GList;
