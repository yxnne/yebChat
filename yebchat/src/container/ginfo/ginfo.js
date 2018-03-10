import React from 'react';
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

@connect(
  state=>state.user,
  { update }
)
class GInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      avatar:'',
      title:'',
      desc:'',
    };
  }

  onChange(key, val){
    this.setState({
      [key]:val
    });
  }

  getSelectedAvatar(avatarName){
    // console.log(avatarName);
    this.setState({
        avatar:avatarName
    });
  }

  render(){
    const redirectTo = this.props.redirectTo;
    const path = this.props.location.pathname;
    return (
      <div>
        {redirectTo && path !== redirectTo ? <Redirect to={this.props.redirectTo}/>:null}
        <NavBar mode="dark" >G Info ？</NavBar> {/* 只是一个简单的页面头*/}
        <AvatarSelector selectedAvatar={this.getSelectedAvatar.bind(this)}></AvatarSelector>
        <InputItem onChange={(val)=>this.onChange('title', val)}>Title</InputItem>
        <TextareaItem rows={3} autoHeight title="Desc"
          onChange={(val)=>this.onChange('desc', val)} />
        <Button onClick={()=>{
          this.props.update(this.state) /*把state给redux*/
          }}
          type="primary">保存</Button>
      </div>
    );
  }
}

export default GInfo;
