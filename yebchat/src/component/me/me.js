import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace } from 'antd-mobile';

@connect(
  state=>state.user, null
)
class Me extends React.Component{

  render(){
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return (
      props.user?
      (
        <div>
          <Result
            img={<img style={{width:50}} src={require(`../img/${props.avatar}.svg`)} />}
            title={props.user}
            message={props.type == 'b'?this.props.company :null}/>

          <List renderHeader={()=>'Introduction'}>
            <Item multipleLine>
              {props.title}
              {this.props.desc.split('\n').map(
                v => <Brief key={v}>{v}</Brief>
              )}
              {props.money?<Brief >{props.money}</Brief>:null}

            </Item>

          </List>
          <WhiteSpace/>
          <List>
            <Item>
              退出登录
            </Item>

          </List>

        </div>
      )
      :null
    );
  }
}

export default Me;
