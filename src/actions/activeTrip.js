import axios from 'axios';
import { store } from './../index';

export const setActiveTrip = tripId => {
  return async (dispatch, getState) => {
    dispatch(getTripStart());
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/trip/${tripId}`,
        {
          headers: {
            'x-auth': getState().auth.token,
          },
        }
      );
      if (request.status === 200) {
        dispatch(getTripSuccess(request.data));
      }
    } catch (e) {
      dispatch(getTripError(e));
    }
  };
};

export const getTripStart = () => {
  return {
    type: 'GET_TRIP_START',
  };
};

export const getTripSuccess = trip => {
  return {
    type: 'GET_TRIP_SUCCESS',
    trip,
  };
};

export const getTripError = error => {
  return {
    type: 'GET_TRIP_ERROR',
    error,
  };
};

export const unsetActiveTrip = () => {
  return {
    type: 'UNSET_ACTIVE_TRIP',
  };
};
