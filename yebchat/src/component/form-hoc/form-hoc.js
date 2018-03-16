import React from 'react';

function FormHoc(Comp){
  return class Wrapper extends React.Component{
    constructor(props){
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }

    // 输入控件事件
    handleChange(key, value){
      this.setState({
        // 注意这个中括号
        [key]:value
      });
    }

    render(){
      return <Comp state={this.state} {...this.props} handleChange={this.handleChange}/>
    }
  }
}

export default FormHoc;
