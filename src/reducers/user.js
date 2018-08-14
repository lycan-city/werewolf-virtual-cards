const user = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export default user;
