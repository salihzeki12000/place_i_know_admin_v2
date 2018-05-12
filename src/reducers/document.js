const initialState = {
  documents: {
    loading: false,
    error: null,
    data: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DOCUMENT_GROUPS_START':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'GET_DOCUMENT_GROUPS_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        data: action.documentGroups,
      };
    case 'GET_DOCUMENT_GROUPS_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false,
        data: [],
      };
    case 'CREATE_DOCUMENT_START':
      return {
        ...state,
        new: {
          loading: true,
          error: null,
          data: {},
        },
      };
    case 'CREATE_DOCUMENT_SUCCESS':
      return {
        ...state,
        new: {
          loading: false,
          error: null,
          data: action.data,
        },
      };
    case 'CREATE_DOCUMENT_ERROR':
      return {
        ...state,
        new: {
          loading: false,
          error: action.error,
          data: {},
        },
      };
    case 'CLEAR_NEW_DOCUMENT_OBJECT':
      return {
        ...state,
        new: undefined,
      }
    case 'UPDATE_DOCUMENT_START':
      return {
        ...state,
      };
    case 'UPDATE_DOCUMENT_SUCCESS':
      return {
        ...state,
      };
    case 'UPDATE_DOCUMENT_ERROR':
      return {
        ...state,
      };
    default:
      return state;
  }
};
