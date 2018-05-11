import React from 'react';
import { connect } from 'react-redux';
import { Icon, Spin } from 'antd';
import { setActiveTrip } from './../../actions/activeTrip';
import TripHeader from './TripHeader';
import TripManager from './TripManager';

export class Trip extends React.Component {
  componentDidMount() {
    this.props.setActiveTrip(this.props.match.params.id);
  }

  render() {
    if (this.props.activeTrip === undefined || this.props.isLoading) {
      return <Spin indicator={<Icon type="loading" spin />} />;
    }
    return (
      <div>
        <TripHeader trip={this.props.activeTrip} />
        <TripManager trip={this.props.activeTrip} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.activeTrip.loading,
  activeTrip: state.activeTrip.data,
});

const mapDispatchToProps = dispatch => ({
  setActiveTrip: tripId => dispatch(setActiveTrip(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
