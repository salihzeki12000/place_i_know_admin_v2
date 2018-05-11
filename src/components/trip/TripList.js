import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
const { Column } = Table;

export class TripList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTripSelection(e, tripId) {
    e.preventDefault();

  }

  columns = () => [
    {
      title: 'Trip ID',
      dataIndex: 'trip_id',
      key: 'trip_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.trip_id - b.trip_id,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.toLowerCase() - b.title.toLowerCase(),
      render: (text, record) => {
        return (
          <span>
            <Link to={`/trip/${record.trip_id}`}>
              {record.title}
            </Link>
          </span>
        );
      },
    },
    {
      title: 'Starts',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => a.start_date > b.start_date,
    },
    {
      title: 'Ends',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => a.end_date > b.end_date,
    },
  ];

  render() {
    return (
      <div>
        <Table dataSource={this.props.trips} columns={this.columns()} />
      </div>
    );
  }
}

export default TripList;
