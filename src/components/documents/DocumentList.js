import React from 'react';
import moment from 'moment';
import { Card, Icon, List } from 'antd';

export class DocumentList extends React.Component {
  humanizeDuration(date) {
    return moment(date).fromNow();
  }

  render() {
    return (
      <List
        dataSource={this.props.documents}
        renderItem={doc => (
          <List.Item
            actions={[
              <Icon type="download" />,
              <Icon type="edit" />,
              <Icon type="swap" />,
              <Icon type="delete" />,
            ]}
            className="list__actions--large"
          >
            <List.Item.Meta
              title={doc.title}
              description={
                <span>
                  Uploaded {this.humanizeDuration(doc.created)}
                  <br />Expires {this.humanizeDuration(doc.expires)}
                </span>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

export default DocumentList;
