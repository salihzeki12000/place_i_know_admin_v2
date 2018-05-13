const initialChatState = {
};

export default (state = initialChatState, action) => {
  switch (action.type) {
    case 'SET_CHAT_USER':
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};
