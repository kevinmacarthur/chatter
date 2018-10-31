import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

 constructor(props) {
    super();
    this.state = {
      currentUser:  "Anonymous",
      messages: []
    }
  this.sendMessage = this.sendMessage.bind(this)
  this.sendNotification = this.sendNotification.bind(this)
  }

  sendMessage(username, message) {
    const newMessage = {
      type: 'postMessage',
      username: username,
      content: message
    };
    this.webSocket.send(JSON.stringify(newMessage))
  }

  sendNotification(newUsername) {
    const newNotificiation = {
      type: 'postNotification',
      currentUser: this.state.currentUser,
      newUsername: newUsername
    };
    this.webSocket.send(JSON.stringify(newNotificiation))
  }

  componentDidMount() {
    this.webSocket = new WebSocket("ws://localhost:3001")
    this.webSocket.onopen = function (event){
      console.log("WebSocket is now open")
    }
    this.webSocket.onmessage = event => {
      const serverMsg = JSON.parse(event.data) //Needs to get event.data.type for some reason its undefined
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
        default:
        throw new Error ("Unknown event type " + serverMsg.type)
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} sendNotification={this.sendNotification} currentUser={this.state.currentUser.name}/>
      </div>

    );
  }
}

class NavBar extends Component {
  render() {
    return (
     <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    );
  }
}


export default App;

