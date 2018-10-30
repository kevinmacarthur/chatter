import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
     const messageList = this.props.messages.map(message => (
      <Message key={message.id} message={message.content} username={message.username} />
    ));
    return (
      <main className="messages">
      {messageList}
      </main>
      )
  }
}

export default MessageList
