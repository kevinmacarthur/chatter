import React, {Component} from 'react';

function Message ({username, message}){

    return (
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content"> {message}</span>
        </div>
    );

}

// Should this be a seperate component
class MessageSystem extends Component {
  render() {
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    )
  }
}
export default Message;