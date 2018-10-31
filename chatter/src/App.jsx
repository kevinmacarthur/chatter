import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

 constructor(props) {
    super();
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    }
  this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(username, message) {
    const newMessage = {
      id: this.state.messages.length + 1, //could import uuid here
      username: username,
      content: message
    };

    this.webSocket.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    this.webSocket = new WebSocket("ws://localhost:3001")
    this.webSocket.onopen = function (event){
      console.log("WebSocket is now open")
    }
    this.webSocket.onmessage = event => {
      const serverMsg = JSON.parse(event.data)
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, serverMsg];
      this.setState({ messages: newMessages });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar sendMessage={this.sendMessage} currentUser={this.state.currentUser.name}/>
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

