import React, {Component} from 'react';

function Message ({username, message, userColor}){
  const userColour = {color: userColor}
    return (
        <div className="message" >
          <span className="message-username" style={userColour}>{username}</span>
          <span className="message-content"> {message}</span>
        </div>
    );
}

export default Message