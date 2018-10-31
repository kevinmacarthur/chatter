import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

 constructor(props) {
    super();
    this.state = {
      currentUser:  "Anonymous",
      messages: [],
      connectedUsers: 1
    }
  this.sendMessage = this.sendMessage.bind(this)
  this.sendNotification = this.sendNotification.bind(this)
  this.updateUser = this.updateUser.bind(this)
  }

// This method sends a message to the websocket with the information from ChatBar.jsx
  sendMessage(message) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: message
    };
    this.webSocket.send(JSON.stringify(newMessage))
  }

  updateUser(newUsername) {
    this.setState({currentUser: newUsername})
  }

// This method sends a notification to the websocket with information from ChatBar.jsx
  sendNotification(newUsername) {
    const newNotificiation = {
      type: 'postNotification',
      currentUser: this.state.currentUser,
      newUsername: newUsername
    };
    this.webSocket.send(JSON.stringify(newNotificiation))
  }

//Depending what the type of message is either update currentuser, messages or number of users
  componentDidMount() {
    this.webSocket = new WebSocket("ws://localhost:3001")
    this.webSocket.onopen = function (event){
      console.log("WebSocket is now open")
    }
    this.webSocket.onmessage = event => {
      const serverMsg = JSON.parse(event.data)
      switch(serverMsg.type) {
        case "incomingMessage":
          let oldMessages = this.state.messages;
          let newMessages = [...oldMessages, serverMsg];
          this.setState({ messages: newMessages });
          break;
        case "incomingNotification":
          let oldMessageNotifications = this.state.messages;
          let newMessageNotifications = [...oldMessageNotifications, serverMsg];
          this.setState({ messages: newMessageNotifications });
          this.setState({currentUser: serverMsg.newUsername})
          break;
        case "connectedClients":
          this.setState({connectedUsers: serverMsg.connectedUsers})
          break;
        default:
        throw new Error ("Unknown event type " + serverMsg.type)
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar currentUsers={this.state.connectedUsers}/>
        <MessageList messages={this.state.messages} />
        <ChatBar updateUser={this.updateUser} currentUser={this.state.currentUser} sendMessage={this.sendMessage} sendNotification={this.sendNotification} />
      </div>

    );
  }
}

function NavBar ({currentUsers}) {

//If there is one user connected remove the s from users in NavBar
  const oneUser =
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="navbar-brand" className="users-online"> {currentUsers} user online </a>
    </nav>

  const multUsers =
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="navbar-brand" className="users-online"> {currentUsers} users online </a>
    </nav>

  if (currentUsers !== 1) {
    return (
      multUsers
    )
  } else {
    return (
      oneUser
    )
  }
}

export default App;

