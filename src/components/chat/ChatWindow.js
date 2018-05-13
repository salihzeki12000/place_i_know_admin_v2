import React from 'react';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit';
import { Icon, Spin } from 'antd';
import ChatRoom from './ChatRoom';
import ConversationPane from './ConversationPane';
import ComposeMessage from './ComposeMessage';

export class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingRooms: false,
      currentRoom: {},
      rooms: [],
    };
  }

  loadRooms() {
    this.setState(() => ({
      isLoadingRooms: true,
    }));
    const rooms = this.state.currentUser.rooms;
    this.setState(() => ({
      rooms,
      isLoadingRooms: false,
    }));
  }

  handleRoomSelection(e, data) {
    console.log('clicked room', data);
  }

  render() {
    if (!this.state.isConnectingToChat) {
      return (
        <div className="chat">
          <div className="chat__contacts">
            {this.state.isLoadingRooms && (
              <Spin indicator={<Icon type="loading" spin />} />
            )}
            {this.state.rooms.length > 0 &&
              this.state.rooms.map(room => {
                return (
                  <ChatRoom
                    key={room.id}
                    room={room}
                    currentUser={this.state.currentUser}
                    handleClick={this.handleRoomSelection}
                  />
                );
              })}
            {!this.state.isLoadingRooms &&
              this.state.rooms.length === 0 && <span>No Chat Rooms</span>}
          </div>
          <div className="chat__conversation">
            <ConversationPane />
            <ComposeMessage />
          </div>
        </div>
      );
    } else {
      return (
        <Spin spinning={this.state.isConnectingToChat}>
          <div className="chat">&nbsp;</div>
        </Spin>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps)(ChatWindow);
