import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username:'',
        message: ''}
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangeMessage = this.handleChangeMessage.bind(this);
      this.keyPress = this.keyPress.bind(this);
   }

   handleChangeUsername(event) {
      this.setState({ username: event.target.value });
   }
   handleChangeMessage(event) {
      this.setState({ message: event.target.value });
   }

   keyPress(e){
      if(e.keyCode == 13 && this.state.message.length > 0){
         this.props.sendMessage(this.state.username, this.state.message)
         e.target.value = ''
      }
   }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyDown={this.keyPress} onChange={this.handleChangeUsername} placeholder={this.props.currentUser} />
        <input className="chatbar-message" onKeyDown={this.keyPress} onChange={this.handleChangeMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}



export default ChatBar
