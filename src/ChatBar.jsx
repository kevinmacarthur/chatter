import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
      super(props);
      this.keyPress = this.keyPress.bind(this);
   }

   handleChange(e) {
      this.setState({ value: e.target.value });
   }

   keyPress(e){
      if(e.keyCode == 13){
        this.props.addMessage(e.target.value);
         e.target.value = ''
      }
   }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} />
        <input className="chatbar-message" onKeyDown={this.keyPress} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar
