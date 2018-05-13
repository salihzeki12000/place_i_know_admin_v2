import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Table } from 'antd';
import { AddUserToRoomForm } from './AddUserToRoomForm';
import { RemoveUserFromRoomForm } from './RemoveUserFromRoomForm';

export class ChatRoomsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addUserToRoomFormVisible: false,
    };
  }

  columns() {
    return [
      {
        title: 'Room',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Room ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Participants',
        dataIndex: 'users',
        key: 'users',
        render: text => {
          return text.map(user => user.name).join(', ');
        },
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button.Group>
              <Button icon="plus" onClick={() => this.presentAddUserModal(record.id)} />
              <Button icon="minus" onClick={() => this.presentRemoveUserModal(record)} />
            </Button.Group>
          </span>
        ),
      },
    ];
  }

  presentAddUserModal = roomId => {
    this.setState(() => ({
      addUserToRoomFormVisible: true,
      activeRoomId: roomId,
    }));
  };

  handleCancelAddUser = () => {
    this.setState(() => ({
      addUserToRoomFormVisible: false,
      activeRoomId: undefined,
    }));
  };

  addUserToRoom = (roomId, userId) => {
    this.props.currentUser
      .addUserToRoom({
        userId,
        roomId,
      })
      .then(() => {
        this.setState(() => ({
          addUserToRoomFormVisible: false,
          activeRoomId: undefined,
        }));
      })
      .catch(e => {
        console.log(e);
      });
  };

  presentRemoveUserModal = room => {
    this.setState(() => ({
      removeUserFromRoomFormVisible: true,
      activeRoom: room,
    }));
  };

  handleCancelRemoveUser = () => {
    this.setState(() => ({
      removeUserFromRoomFormVisible: false,
      activeRoom: undefined,
    }));
  };

  removeUserFromRoom = (roomId, userId) => {
    this.props.currentUser
      .removeUserFromRoom({
        userId,
        roomId,
      })
      .then(() => {
        this.setState(() => ({
          removeUserFromRoomFormVisible: false,
          activeRoom: undefined,
        }));
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>
        <Table dataSource={this.props.rooms} columns={this.columns()} />
        <Modal
          title={
            <span>
              <Icon type="plus" /> Add User
            </span>
          }
          destroyOnClose={true}
          visible={this.state.addUserToRoomFormVisible}
          footer={[
            <Button key="cancel" onClick={this.handleCancelAddUser}>
              Cancel
            </Button>,
          ]}
        >
          <AddUserToRoomForm
            roomId={this.state.activeRoomId}
            currentUser={this.props.currentUser}
            onSubmit={(roomId, userId) => this.addUserToRoom(roomId, userId)}
          />
        </Modal>
        <Modal
          title={
            <span>
              <Icon type="disconnect" /> Remove User
            </span>
          }
          destroyOnClose={true}
          visible={this.state.removeUserFromRoomFormVisible}
          footer={[
            <Button key="cancel" onClick={this.handleCancelRemoveUser}>
              Cancel
            </Button>,
          ]}
        >
          <RemoveUserFromRoomForm
            room={this.state.activeRoom}
            currentUser={this.props.currentUser}
            onSubmit={(roomId, userId) => this.removeUserFromRoom(roomId, userId)}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ChatRoomsTab);
