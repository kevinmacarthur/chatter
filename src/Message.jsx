import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("message props", this.props)
    return (
        <div className="message" key={this.props.key}>
          <span className="message-username">{this.props.username}</span>
          <span className="message-content"> {this.props.message}</span>
        </div>
    );
  }
}

// Should this be a seperate component
class MessageSystem extends Component {
  render() {
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    )
  }
}
export default Message;