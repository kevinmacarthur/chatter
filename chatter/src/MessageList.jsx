import React, {Component} from 'react';
import Message from './Message.jsx'

function MessageList ({messages}) {

     const messageList = messages.map(message => (
      <Message key={message.id} message={message.content} username={message.username} />
    ));
    return (
      <main className="messages">
      {messageList}
      </main>
      )
}


export default MessageList
