import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTrips } from './../actions/trip';
import TripList from './trip/TripList';

export class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getAllTrips();
  }

  render() {
    return (
      <div>
        <TripList trips={this.props.tripData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tripData: state.trips.data === undefined ? [] : state.trips.data.map(trip => {
    return {
      ...trip,
      start_date: moment(trip.start_date).format('D MMM YYYY'),
      end_date: moment(trip.end_date).format('D MMM YYYY'),
    }
  }),
});

const mapDispatchToProps = dispatch => ({
  getAllTrips: () => dispatch(getTrips()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
