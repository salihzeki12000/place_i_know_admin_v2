import React from 'react';
import { AutoComplete, Button, Input } from 'antd';

export class AddUserToRoomForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Input.Group compact>
        <AutoComplete
          dataSource={this.props.currentUser.users.map(user => ({
            text: user.name,
            value: user.id,
          }))}
          onSelect={value => {
            this.setState(() => ({
              selectedUserId: value,
            }));
          }}
          style={{width:'75%'}}
        />
        <Button
          type="primary"
          onClick={() =>
            this.props.onSubmit(this.props.roomId, this.state.selectedUserId)
          }
          style={{width:'25%'}}
        >
          Add
        </Button>
        </Input.Group>
      </div>
    );
  }
}
