import React from 'react';
import { List, InputItem, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, recvMsg } from '../../redux/chat.redux';
import { sengMsg } from '../../redux/chat.redux';


// 链接 后台socket，使用 ws:web socket 协议
// const socket = io('ws://localhost:9090');
@connect(
  state=>state, {getMsgList, sengMsg, recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text:'', msg:[]
    };
  }

  componentDidMount(){
    //使用socket 监听事件recvmsg
    // socket.on('recvmsg', (data)=>{
    //   console.log(data);
    //   this.setState({
    //     msg:[...this.state.msg, data.text]
    //   });
    // });

    this.props.getMsgList();
    this.props.recvMsg();
  }

  handleSubmit(){
    // console.log(this.state.text);
    // socket.emit('sendmsg', {text:this.state.text});
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sengMsg({from, to, msg});
    this.setState({text:''});
  }

  render () {
    const user = this.props.match.params.user;
    const Item = List.Item;
    return (

      <div id="chat-page">
        <NavBar mode='dark'>{this.props.match.params.user}</NavBar>


        <p>chat Page ,with the user:{this.props.match.params.user}</p>
        {
          this.props.chat.chatmsg.map(v=>{

            return v.from == user?
            (
              <List key={v._id}>
                <Item>{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item className="chat-me"
                  extra={'avatar'}>{v.content}</Item>
              </List>
            );

          })
        }
        <div className="stick-footer">

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
      </div>
    );
  }
}

export default Chat;
