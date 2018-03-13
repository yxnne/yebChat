import React from 'react';
import axios from 'axios';

class B extends React.Component{
  constructor(){
    super();
    this.state = {
      data:[]
    };
  }
  componentDidMount(){
    axios.get('/user/list?type=g')
    .then(res=>{
      if (res.data.code==0) {
        this.setState({data:res.data.data})
      }
    });
  }
  render(){
    return (
      <div>
        <h2>This is B component</h2>
      </div>
    );
  }
}

export default B;
