import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import ColorDropDown from './ChooseColor.jsx';

class App extends Component {

 constructor(props) {
    super();
    this.state = {
      currentUser:  {name: 'Anonymous', userColor: 'black'},
      messages: [],
      connectedUsers: 1
    };
  this.sendMessage = this.sendMessage.bind(this);
  this.sendNotification = this.sendNotification.bind(this);
  this.updateUser = this.updateUser.bind(this);
  this.updateMessages = this.updateMessages.bind(this);
  this.changeUserColor = this.changeUserColor.bind(this);
  }

// This method sends a message to the websocket with the information from ChatBar.jsx
  sendMessage(message) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: message,
      color: this.state.currentUser.userColor
    };
    this.webSocket.send(JSON.stringify(newMessage));
  }

  updateUser(newUsername) {
    this.setState({currentUser: {name: newUsername, userColor: this.state.currentUser.userColor}});
  }

  updateMessages(newMessage) {
     let oldMessages = this.state.messages;
     let newMessages = [...oldMessages, newMessage];
     this.setState({ messages: newMessages });
  }

  changeUserColor(newColor) {
    this.setState({currentUser: {name: this.state.currentUser.name, userColor: newColor}});
  }

// This method sends a notification to the websocket with information from ChatBar.jsx
  sendNotification(newUsername) {
    const newNotificiation = {
      type: 'postNotification',
      currentUser: this.state.currentUser.name,
      newUsername: newUsername
    };
    this.webSocket.send(JSON.stringify(newNotificiation));
  }

//Depending what the type of message is either update currentuser, messages or number of users
  componentDidMount() {
    this.webSocket = new WebSocket('ws://localhost:3001');
    this.webSocket.onopen = function (){
    };
    this.webSocket.onmessage = event => {
      const serverMsg = JSON.parse(event.data);
      switch(serverMsg.type) {
        case 'incomingMessage':
          this.updateMessages(serverMsg);
          break;
        case 'incomingNotification':
          this.updateMessages(serverMsg);
          break;
        case 'connectedClients':
          this.setState({connectedUsers: serverMsg.connectedUsers});
          break;
        case 'userColor':
          this.setState({currentUser: {name: this.state.currentUser.name, userColor: serverMsg.connectedUserColor}});
          break;
        default:
        throw new Error ('Unknown event type ' + serverMsg.type);
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar currentUsers={this.state.connectedUsers}/>
        <ColorDropDown changeUserColor={this.changeUserColor} currentColor={this.state.currentUser.userColor}/>
        <MessageList messages={this.state.messages} />
        <ChatBar updateUser={this.updateUser} currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} sendNotification={this.sendNotification} />
      </div>

    );
  }
}

function NavBar ({currentUsers}) {
//If there is one user connected remove the s from users in NavBar
  const oneUser =
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="navbar-brand" className="users-online"> {currentUsers} User Online </a>
    </nav>

  const multUsers =
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="navbar-brand" className="users-online"> {currentUsers} Users Online </a>
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

