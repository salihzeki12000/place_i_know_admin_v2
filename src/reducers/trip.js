const initialTripState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialTripState, action) => {
  switch (action.type) {
    case 'GET_TRIPS_START':
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case 'GET_TRIPS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.trips,
      };
    case 'GET_TRIPS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
};
