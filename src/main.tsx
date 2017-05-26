import React from 'react';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export class App extends React.Component<any, void> {
  render() {
    return<Provider store={store}>
    <AppContainer />
  </Provider>;
  }
}
