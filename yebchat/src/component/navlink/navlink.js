import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLinkBar extends React.Component{
  // 属性验证
  static propTypes = {
    data:PropTypes.array.isRequired
  };
  render(){
    // v.hide是true的话被过滤了
    const navList = this.props.data.filter(v=>!v.hide);
    const {pathname} = this.props.location;
    return (
      <TabBar>
        {
          navList.map(v=>(
            <TabBar.Item title={v.text} key={v.path}
              icon={{uri:require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
              selected={pathname === v.path}
              onPress={()=>{
                this.props.history.push(v.path)
              }}>
              </TabBar.Item>
          ))
        }
      </TabBar>
    );
  }
}

export default NavLinkBar;
