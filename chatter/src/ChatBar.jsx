import React, {Component} from 'react';

function ChatBar ({updateUser, sendNotification, sendMessage, currentUser}) {

   function keyPressUsername(e){
      if(e.keyCode == 13 && currentUser !== e.target.value){
        sendNotification(e.target.value)
        updateUser(e.target.value)
      }
   }

   function keyPressMessage(e){
      if(e.keyCode == 13 && e.target.value.length > 0){
         sendMessage(e.target.value)
         e.target.value = ''
      }
   }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyDown={keyPressUsername} placeholder="Type Username and hit ENTER" />
        <input className="chatbar-message" onKeyDown={keyPressMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    )
}

export default ChatBar
