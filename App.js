import React, { Component } from 'react';
import { Linking } from 'react-native';
import Expo from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStackNavigator } from 'react-navigation';
import reducer from './src/reducers';
import NavigationService from './src/navigation';

// Views
import Card from './src/views/Card';
import Game from './src/views/Game';
import Home from './src/views/Home';
import Join from './src/views/Join';
import Lobby from './src/views/Lobby';
import Prepare from './src/views/Prepare';

const Root = createStackNavigator(
  {
    Card,
    Game,
    Home,
    Join,
    Lobby,
    Prepare,
  },
  { initialRouteName: 'Home' }
);

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default class App extends Component {
  state = {
    fontsLoaded: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    Linking.addEventListener('url', ({ url }) => this.handleOpenURL(url));
    Linking.getInitialURL().then(this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (url) => {
    const partyId = Expo.Linking.parse(url).queryParams.id;

    if (!partyId) {
      return null;
    }

    setTimeout(() => {
      NavigationService.navigate('Join', { partyId });
    }, 500);

    return null;
  };

  render() {
    const { fontsLoaded } = this.state;
    if (!fontsLoaded) return null;
    return (
      <Provider store={store}>
        <Root
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
