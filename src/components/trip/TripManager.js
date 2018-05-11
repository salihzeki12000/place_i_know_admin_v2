import React from 'react';
import { Icon, Tabs } from 'antd';
import DocumentsPage from './../documents/DocumentsPage';
const { TabPane } = Tabs;

export const TripManager = props => {
  return (
    <div>
      <Tabs tabPosition="left">
        <TabPane
          tab={
            <span>
              <Icon type="file" /> Documents
            </span>
          }
          key={1}
        >
          <DocumentsPage trip={props.trip} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TripManager;
