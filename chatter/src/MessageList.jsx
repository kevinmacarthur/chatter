import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

function MessageList ({messages}) {
  const messageList = messages.map(message => {
    if (message.type === 'incomingMessage') {
      return(
        <Message key={message.id} message={message.content} username={message.username} userColor={message.color} />
      )
    }
    if (message.type === 'incomingNotification') {
      return (
        <Notification key={message.id} oldUsername={message.currentUser} newUsername={message.newUsername} />
      )
    }
    });

    return (
      <main className="messages">
      {messageList}
      </main>
    )
}

export default MessageList
