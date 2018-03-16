import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace,Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state=>state.user, {logoutSubmit}
)
class Me extends React.Component{

  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);

  }

  logout(){
    const alert = Modal.alert
    console.log('logout function ');
    alert('注销', '确认退出登录吗???', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确认', onPress: () => {
            browserCookie.erase('userid')
            this.props.logoutSubmit()
          }}
        ])
  }

  render(){
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return (
      props.user?
      (
        <div>
          <Result
            img={<img style={{width:50}} src={require(`../img/${props.avatar}.svg`)} alt='avatar'/>}
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
            <Item onClick={this.logout}>
              退出登录
            </Item>

          </List>

        </div>
      )
      :<Redirect to={props.redirectTo} />
    );
  }
}

export default Me;
