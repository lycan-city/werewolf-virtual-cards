import React, { Component } from 'react';
import { Linking } from 'expo';
import propTypes from 'prop-types';

import {
  Container,
  Content,
  Label,
  Button,
  Text,
  Icon,
  View,
  Separator,
  ListItem,
} from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles';

class Lobby extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.party.name,
  });

  render() {
    const { id, players } = this.props.navigation.state.params.party;
    const currentPlayers = Object.values(players);

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
          {currentPlayers}
          <Button
            block
            bordered
            warning
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Prepare')}
          >
            <Text>Prepare</Text>
          </Button>
          <Button
            block
            bordered
            success
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Game')}
          >
            <Text>Start</Text>
          </Button>
          <Button
            block
            bordered
            danger
            style={styles.button}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>Flee</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

Lobby.propTypes = {
  navigation: propTypes.object.isRequired,
};

export default Lobby;
