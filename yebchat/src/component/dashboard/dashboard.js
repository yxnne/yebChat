import React from 'react';
import { NavBar } from 'antd-mobile';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import B from '../b/b';

import NavLinkBar from '../navlink/navlink';


function G(){
  return <h2>This is G</h2>
}
function Msg(){
  return <h2>This is MSG</h2>
}
function Me(){
  return <h2>This is Me</h2>
}
@connect(
  state=>state
)
class Dashboard extends React.Component{



  render(){
    // Dashboard本来就是一个Router组件，所以不需要withRouter
    const { pathname } = this.props.location;

    const user = this.props.user; // props.user passed From Redux
    const navList = [
      {
        path:'/b',
        text:'Genius',
        icon:'boss',
        title:'G List',
        component:G,
        hide:user.type == 'g'
      },
      {
        path:'/g',
        text:'Boss',
        icon:'job',
        title:'B List',
        component:B,
        hide:user.type == 'b'
      },
      {
        path:'/msg',
        text:'Msg',
        icon:'boss',
        title:'Message',
        component:Msg

      },
      {
        path:'/me',
        text:'Me',
        icon:'user',
        title:'Profile',
        component:Me

      },
    ];

    console.log('path name is ',pathname);
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop:8}}>
          <Switch>
            {
              navList.map(v=>(
                <Route key={v.path} path={v.path} component={v.component} />
              ))
            }
          </Switch>
        </div>
        {/* 底部Tab */}
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;
