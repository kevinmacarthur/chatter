import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username:'',
        message: ''}
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangeMessage = this.handleChangeMessage.bind(this);
      this.keyPressMessage = this.keyPressMessage.bind(this);
      this.keyPressUsername = this.keyPressUsername.bind(this)
   }

   handleChangeUsername(event) {
      this.setState({ username: event.target.value });
   }

   handleChangeMessage(event) {
      this.setState({ message: event.target.value });
   }

   keyPressUsername(e){
      if(e.keyCode == 13 && this.state.message.username !== e.target.value){
        console.log("E TARGET VALUE ", e.target.value)
        console.log("this.username", this.state.username)
         this.props.sendNotification(this.state.username)
      }
   }

   keyPressMessage(e){
      if(e.keyCode == 13 && this.state.message.length > 0){
         this.props.sendMessage(this.state.username, this.state.message)
         this.setState({message: ''})
         e.target.value = ''
      }
   }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyDown={this.keyPressUsername} onChange={this.handleChangeUsername} placeholder="Username" />
        <input className="chatbar-message" onKeyDown={this.keyPressMessage} onChange={this.handleChangeMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}



export default ChatBar
