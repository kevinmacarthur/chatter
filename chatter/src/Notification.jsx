import React, {Component} from 'react';

function Notification ({oldUsername, newUsername}) {
    return (
      <div className="message system">
        {oldUsername} changed their name to {newUsername}.
      </div>
    )
}

export default Notification;