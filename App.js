import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './src/views/Card';
import Lobby from './src/views/Lobby';
import Prepare from './src/views/Prepare';

export default class App extends React.Component {
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
      <Prepare />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
