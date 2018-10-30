import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

 constructor(props) {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
    { id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    { id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
    }
  this.addMessage = this.addMessage.bind(this)
  }
  addMessage(message) {

    const newMessage = {
      id: this.state.messages.length + 1, //could import uuid here
      username: this.state.currentUser.name,
      content: message
    };

    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages });
  }


  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser.name}/>
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

