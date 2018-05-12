import documentReducer from './document';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TRIP':
      return {
        ...state,
        trip: action.trip,
      };
    case 'UNSET_ACTIVE_TRIP':
      return {
        trip: {},
      };
    case 'GET_TRIP_START':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'GET_TRIP_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        data: action.trip,
      };
    case 'GET_TRIP_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false,
        data: {},
      };
    case 'GET_DOCUMENT_GROUPS_START':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'GET_DOCUMENT_GROUPS_SUCCESS':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'GET_DOCUMENT_GROUPS_ERROR':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'CREATE_DOCUMENT_START':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'CREATE_DOCUMENT_SUCCESS':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'CREATE_DOCUMENT_ERROR':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'CLEAR_NEW_DOCUMENT_OBJECT':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'UPDATE_DOCUMENT_START':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'UPDATE_DOCUMENT_SUCCESS':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    case 'UPDATE_DOCUMENT_ERROR':
      return {
        ...state,
        documents: documentReducer(state.documents, action),
      };
    default:
      return state;
  }
};
