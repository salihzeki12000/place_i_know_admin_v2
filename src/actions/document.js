import axios from 'axios';
import { store } from './../index';

export const getDocumentGroups = tripId => {
  return async (dispatch, getState) => {
    dispatch(getDocumentGroupsStart());
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/document_groups`,
        {
          headers: {
            'x-auth': getState().auth.token,
          },
        }
      );
      if (request.status === 200) {
        dispatch(getDocumentGroupsSuccess(request.data));
      }
    } catch (e) {
      dispatch(getDocumentGroupsError(e));
    }
  };
};

export const getDocumentGroupsStart = () => {
  return {
    type: 'GET_DOCUMENT_GROUPS_START',
  };
};

export const getDocumentGroupsSuccess = documentGroups => {
  return {
    type: 'GET_DOCUMENT_GROUPS_SUCCESS',
    documentGroups,
  };
};

export const getDocumentGroupsError = error => {
  return {
    type: 'GET_DOCUMENT_GROUPS_ERROR',
    error,
  };
};