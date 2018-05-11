import React from 'react';
import { Icon, Collapse } from 'antd';
import DocumentList from './DocumentList';

export class DocumentGroups extends React.Component {
  renderList() {
    return (
      <Collapse defaultActiveKey={this.props.groups[0].document_group_id}>
        {this.props.groups.map(group => (
          <Collapse.Panel
            key={group.document_group_id}
            showArrow={false}
            header={
              <h2>
                <Icon type="folder" />&nbsp;{group.title}
              </h2>
            }
          >
            <DocumentList documents={group.documents} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  }
  render() {
    return (
      <div>
        {this.props.groups.length === 0 ? (
          <span>No documents uploaded.</span>
        ) : (
          this.renderList()
        )}
      </div>
    );
  }
}

export default DocumentGroups;
