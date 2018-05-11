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
    default:
      return state;
  }
};
