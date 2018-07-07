import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Card from './src/views/Card'
import Game from './src/views/Game'
import Home from './src/views/Home'
import Join from './src/views/Join'
import Lobby from './src/views/Lobby'
import Prepare from './src/views/Prepare'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Root = createStackNavigator(
  { 
    Card,
    Game,
    Home,
    Join,
    Lobby,
    Prepare
  },
  { initialRouteName: 'Home'}
);

export default class App extends Component {
  state = {
    fontsLoaded: false,
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded) return null;
    return (
      <Root />
    );
  }
}
