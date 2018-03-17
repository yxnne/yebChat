import React from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';

// 链接 后台socket，使用 ws:web socket 协议
const socket = io('ws://localhost:9090');

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text:'', msg:[]
    };
  }

  componentDidMount(){
    //使用socket 监听事件recvmsg
    socket.on('recvmsg', (data)=>{
      console.log(data);
      this.setState({
        msg:[...this.state.msg, data.text]
      });
    });
  }

  handleSubmit(){
    // console.log(this.state.text);
    socket.emit('sendmsg', {text:this.state.text});
  }

  render () {
    return (
      <div className="stick-footer">
        <p>chat Page ,with the user:{this.props.match.params.user}</p>
        {
          this.state.msg.map(v=>{
            return (<p key={v}>{v}</p>);
          })
        }
        <List>
          <InputItem placeholder='请输入'
            value={this.state.text}
            onChange={v=>{
              this.setState({text:v})
            }}
            extra={<span onClick={()=>{this.handleSubmit()}}>Send</span>}
            ></InputItem>
        </List>
      </div>
    );
  }
}

export default Chat;
