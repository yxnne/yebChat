import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component{
  // 暴露的属性, 类型检测
  static propTypes = {
    selectedAvatar:PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = { };
  }

  render(){
    const avatarObjList = 'man1,man2,man3,man4,woman1,woman2,woman3,woman4,woman5,fishbone,flower,banana,fire,tree,water'
                      .split(',')
                      .map(i => ({
                        icon:require(`../img/${i}.svg`),
                        text:i
                      }));
    const gridHeader = this.state.icon
                      ?(<div>
                          <span>已选择头像 &nbsp;&nbsp;&nbsp;</span>
                          <img style={{width:20}} src={this.state.icon}/>
                        </div>)
                      :'请选择头像';

    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarObjList}  columnNum={5}
            onClick={clickedItem=>{
              this.setState(clickedItem);
              this.props.selectedAvatar(clickedItem.text);
            }}/>
        </List>

      </div>
    );
  }
}

export default AvatarSelector;
