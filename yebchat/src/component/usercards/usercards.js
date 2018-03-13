import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';

class UserCards extends React.Component{

  // 属性验证
  static propTypes = {
    userList:PropTypes.array.isRequired
  };

  render(){

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
                {v.type=='b'?<div>{v.company}</div>:null}
                {v.desc.split('\n').map(i=>(
                    <div>{i}</div>
                ))}
                {v.type=='b'?<div>{v.money}</div>:null}
              </Card.Body>
            </Card>
            :null
          ))}
        </WingBlank>
      </div>
    );
  }
}

export default UserCards;
