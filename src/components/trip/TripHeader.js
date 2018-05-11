import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';

export const TripHeader = props => {
  const formatDate = date => {
    return moment(date).format('ddd D MMM YYYY');
  };

  return (
    <div>
      <h1>{props.trip.title}</h1>
      <p>
        {formatDate(props.trip.start_date)}&nbsp;&mdash;&nbsp;{formatDate(
          props.trip.end_date
        )}
      </p>
      <Divider />
    </div>
  );
};

export default TripHeader;
