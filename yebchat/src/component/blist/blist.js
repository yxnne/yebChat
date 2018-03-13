import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';

@connect(
  state=>state.chatuser ,
  { getUserList }
)
class BList extends React.Component{
  constructor(){
    super();
    this.state = {
      data:[]
    };
  }
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
    console.log(this.state)
    return (
      <div>
        <WingBlank>
          {this.props.userList.map(v=>(
            v.avatar?
            <Card key={v._id}>
              <Card.Header title={v.user}
                thumb={<img style={{width:58, height:58}} src={require(`../img/${v.avatar}.svg`)}/>}
                extra={<span>{v.title}</span>}>
              </Card.Header>
              <Card.Body>
                {v.desc.split('\n').map(v=>(
                    <div>{v}</div>
                ))}
              </Card.Body>
            </Card>
            :null
          ))}
        </WingBlank>
      </div>
    );
  }
}

export default BList;
