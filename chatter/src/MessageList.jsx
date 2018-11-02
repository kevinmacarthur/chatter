import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

const messages = document.getElementById('messages');

function MessageList ({messages, changeUserColor}) {
   console.log("MESSAGE LIST LOOKING FOR CHANGE COLOUR PROP", changeUserColor)
  const messageList = messages.map(message => {
    if (message.type === "incomingMessage") {
      return(
        <Message key={message.id} message={message.content} username={message.username} userColor={message.color} />
      )
    }
    if (message.type === "incomingNotification") {
      return (
        <Notification key={message.id} oldUsername={message.currentUser} newUsername={message.newUsername} />
      )
    }
    });

   function changeHandler(e){
         changeUserColor(e.target.value)
      }

    return (
      <main className="messages">
        <span>Choose your color! </span>
        <select className = "dropDown" onChange={changeHandler}>
          <option value="black" > </option>
          <option value="#bc203e">red</option>
          <option value="#4e8ef4">blue</option>
          <option value="#25964b">green</option>
          <option value="black">black</option>
        </select>
      {messageList}
      </main>
    )
}


export default MessageList
