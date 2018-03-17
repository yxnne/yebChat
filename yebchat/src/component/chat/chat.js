import React from 'react';

class Chat extends React.Component{
  render () {
    return (
      <div>
        <p>chat Page ,with the user:{this.props.match.params.user}</p>
      </div>
    );
  }
}

export default Chat;
