import types from '../actions';

const alert = (state = {}, action) => {
  switch (action.type) {
    case types.alert.set:
      return { show: action.show, title: action.title, message: action.message };
    default:
      return state;
  }
};

export default alert;
