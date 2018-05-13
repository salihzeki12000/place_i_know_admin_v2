import React from 'react';
import { Button, Input, Select } from 'antd';

export class RemoveUserFromRoomForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Input.Group compact>
          <Select
            onSelect={value => {
              this.setState(() => ({
                selectedUserId: value,
              }));
            }}
            style={{ width: '75%' }}
          >
            {this.props.room.users.map(user => {
              return (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              );
            })}
          </Select>

          <Button
            type="primary"
            onClick={() =>
              this.props.onSubmit(this.props.room.id, this.state.selectedUserId)
            }
            style={{ width: '25%' }}
          >
            Remove
          </Button>
        </Input.Group>
      </div>
    );
  }
}
