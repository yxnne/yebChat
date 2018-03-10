import React from 'react';
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';


class BInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      avatar:'',
      title:'',
      company:'',
      money:'',
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
    return (
      <div>
        <NavBar mode="dark" >B Info ？</NavBar> {/* 只是一个简单的页面头*/}
        <AvatarSelector selectedAvatar={this.getSelectedAvatar.bind(this)}></AvatarSelector>
        <InputItem onChange={(val)=>this.onChange('title', val)}>Title</InputItem>
        <InputItem onChange={(val)=>this.onChange('company', val)}>Company</InputItem>
        <InputItem onChange={(val)=>this.onChange('money', val)}>Money</InputItem>
        <TextareaItem rows={3} autoHeight title="Desc"
          onChange={(val)=>this.onChange('desc', val)} />
        <Button type="primary">保存</Button>
      </div>
    );
  }
}

export default BInfo;
