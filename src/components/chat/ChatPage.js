import React from 'react';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit';
import { Tabs, Spin } from 'antd';
import { setChatUser } from './../../actions/chat';
import ChatWindow from './ChatWindow';
import ChatRoomsTab from './ChatRoomsTab';

export class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnectingToChat: true,
      currentUser: undefined,
      currentRoom: {},
      rooms: [],
    };
  }

  componentDidMount() {
    this.setState(() => ({
      isConnectingToChat: true,
    }));
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_PUSHER_INSTANCE,
      userId: String(this.props.user.user.profileId),
      tokenProvider: new Chatkit.TokenProvider({
        url: `${process.env.REACT_APP_API_URL}/chat/authenticate`,
        queryParams: {},
        headers: {
          'x-auth': this.props.user.token,
        },
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.props.setChatUser(currentUser);
        this.setState(() => ({
          isConnectingToChat: false,
          currentUser,
        }));
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <Spin spinning={this.state.isConnectingToChat}>
          <Tabs>
            <Tabs.TabPane tab="Users" key="1">
              <div>Users</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rooms" key="2">
              <ChatRoomsTab
                currentUser={this.state.currentUser}
                rooms={this.state.isConnectingToChat ? [] : this.state.currentUser.rooms}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chat" key="3">
              <ChatWindow />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setChatUser: chatUser => dispatch(setChatUser(chatUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
