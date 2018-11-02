import React, {Component} from 'react';


class Message extends Component {
  constructor(props) {
    super();
  }

componentDidMount() {
  window.scrollTo(0,document.body.scrollHeight)
}
render(){
  const userColour = {color: this.props.userColor}
  return (
        <div className="message" >
          <span className="message-username" style={userColour}>{this.props.username}</span>
          <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.message}} />
        </div>
    );
  }
}

// function Message ({username, message, userColor}){
//   const userColour = {color: userColor}
//     return (
//         <div className="message" >
//           <span className="message-username" style={userColour}>{username}</span>
//           <span className="message-content" dangerouslySetInnerHTML={{__html: message}} />
//         </div>
//     );
// }
// Message.prototype.componentDidMount = function () {
//   window.scrollTo(0,document.body.scrollHeight)
//   console.log("Mount")
// }
export default Message