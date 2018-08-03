import React, { Component } from 'react';
import { Linking } from 'expo';
import propTypes from 'prop-types';

import {
  Container, Content, Label, Button, Text, View, Separator
} from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import Db from '../../db';

class Lobby extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.party.name,
  });

  constructor() {
    super();
    this.state = {
      id: '',
      players: [],
    };

    this.db = Db.get();
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { party = {} } = navigation.state.params;
    if (party) {
      const { id, players = {} } = party;
      const playersNames = Object.keys(players).map(p => players[p].name);
      this.setState({ id, players: playersNames });
      this.unsubscribe = this.db.subscribeToParty(id, p => this.updateState(p));
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe = () => {};

  updateState(party) {
    const { id, players = {} } = party;
    this.setState({ id, players });
  }

  render() {
    const { navigation } = this.props;
    const { id, players } = this.state;
    const currentPlayers = Object.keys(players).map(k => <Text key={k}>{players[k].name}</Text>);

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.qrContainer}>
            <Label style={styles.qrLabel}>{id}</Label>
            <QRCode
              value={Linking.makeUrl('/', { id })}
              size={200}
              bgColor="black"
              fgColor="white"
            />
          </View>
          <Separator bordered>
            <Text>Players</Text>
          </Separator>
          <View>{currentPlayers}</View>
          <Button
            block
            bordered
            warning
            style={styles.button}
            onPress={() => navigation.navigate('Prepare')}
          >
            <Text>Prepare</Text>
          </Button>
          <Button
            block
            bordered
            success
            style={styles.button}
            onPress={() => navigation.navigate('Game')}
          >
            <Text>Start</Text>
          </Button>
          <Button block bordered danger style={styles.button} onPress={() => navigation.goBack()}>
            <Text>Flee</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

Lobby.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
    state: propTypes.object,
  }).isRequired,
};

export default Lobby;
