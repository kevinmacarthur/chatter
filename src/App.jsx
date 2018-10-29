import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import Message from './Message.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Message />
        <ChatBar />
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

