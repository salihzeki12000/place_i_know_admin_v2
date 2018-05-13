import React from 'react';
import { Avatar, Badge } from 'antd';

export class ChatRoom extends React.Component {
  determineActiveClass() {
    return this.props.active ? 'chat__contact active' : 'chat__contact';
  }

  render() {
    return (
      <div className={this.determineActiveClass()} onClick={(e) => this.props.handleClick(e, this.props.room.id)}>
        <div className="chat__contact__details">
          <div className="chat__contact-avatar">
            <Avatar shape="square" size="small" icon="message" />
          </div>
          <div className="chat__contact-room-title">{this.props.room.title}</div>
        </div>

        <div className="chat__contact-unread-count">
          <Badge count={0} />
        </div>
      </div>
    );
  }
}

export default ChatRoom;
