import React, { Component } from 'react';
import { Linking } from 'react-native';
import Expo from 'expo';

import { createStackNavigator, NavigationActions } from 'react-navigation';
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

export default class App extends Component {
  navigatorRef = null;

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
      this.navigatorRef.dispatch(
        NavigationActions.navigate({
          routeName: 'Join',
          params: { partyId },
        })
      );
    }, 500);

    return null;
  };

  render() {
    const { fontsLoaded } = this.state;
    if (!fontsLoaded) return null;
    return (
      <Root
        ref={(navigatorRef) => {
          this.navigatorRef = navigatorRef;
        }}
      />
    );
  }
}
