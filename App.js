import React, { Component } from 'react';
import { Font } from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Root } from 'native-base';
import reducer from './src/reducers';
import NavigationService from './src/navigation';

// Views
import Card from './src/views/Card';
import Game from './src/views/Game';
import Splash from './src/views/Splash';
import Party from './src/views/Party';
import Join from './src/views/Join';
import Lobby from './src/views/Lobby';
import Prepare from './src/views/Prepare';

const AppNavigator = createStackNavigator(
  {
    Card,
    Game,
    Splash,
    Party,
    Join,
    Lobby,
    Prepare,
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default class App extends Component {
  state = {
    fontsLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const { fontsLoaded } = this.state;
    if (!fontsLoaded) return null;
    return (
      <Provider store={store}>
        <Root>
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Root>
      </Provider>
    );
  }
}
