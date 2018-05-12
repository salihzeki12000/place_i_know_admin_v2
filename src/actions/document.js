import axios from 'axios';
import moment from 'moment';

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

export const createNewDocument = data => {
  return async (dispatch, getState) => {
    dispatch(createDocumentStart());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/document/upload`,
        {
          trip_id: getState().activeTrip.data.trip_id,
          document_group_id: data.documentGroupId,
          new_document_group:
            data.newDocumentGroup !== undefined ? data.newDocumentGroup : '',
          file_name: data.fileName,
          file_type: data.fileType,
          expires: data.expires.toISOString(),
        },
        {
          headers: {
            'x-auth': getState().auth.token,
          },
        }
      );
      if (response.status === 200) {
        dispatch(createDocumentSuccess(response.data));
      }
    } catch (e) {
      dispatch(createDocumentError(e));
    }
  };
};

export const createDocumentStart = () => {
  return {
    type: 'CREATE_DOCUMENT_START',
  };
};

export const createDocumentSuccess = data => {
  return {
    type: 'CREATE_DOCUMENT_SUCCESS',
    data,
  };
};

export const createDocumentError = error => {
  return {
    type: 'CREATE_DOCUMENT_ERROR',
    error,
  };
};

export const finishUploadingDocument = documentId => {
  return async (dispatch, getState) => {
    dispatch(updateDocumentStart());
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/document/${documentId}`,
        {
          uploaded: true,
        },
        {
          headers: {
            'x-auth': getState().auth.token,
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateDocumentSuccess({}));
        dispatch(clearNewDocumentObject());
        dispatch(getDocumentGroups(getState().activeTrip.data.trip_id));
      }
    } catch (e) {
      dispatch(updateDocumentError(e));
    }
  };
};

export const clearNewDocumentObject = () => {
  return {
    type: 'CLEAR_NEW_DOCUMENT_OBJECT',
  };
};

export const updateDocumentStart = () => {
  return {
    type: 'UPDATE_DOCUMENT_START',
  };
};

export const updateDocumentSuccess = data => {
  return {
    type: 'UPDATE_DOCUMENT_SUCCESS',
    data,
  };
};

export const updateDocumentError = error => {
  return {
    type: 'UPDATE_DOCUMENT_ERROR',
    error,
  };
};
