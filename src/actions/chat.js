export const setChatUser = (currentUser) => {
  return {
    type: 'SET_CHAT_USER',
    currentUser,
  };
};