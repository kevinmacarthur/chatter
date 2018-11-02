import React, {Component} from 'react';

class Notification extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    window.scrollTo(0,document.body.scrollHeight);
  }
  render(){
    return (
      <div className="notification">
        {this.props.oldUsername} changed their name to {this.props.newUsername}.
      </div>
    )}
}

export default Notification;