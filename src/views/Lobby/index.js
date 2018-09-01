import React from 'react';
import { Linking } from 'expo';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container, Content, Label, Button, Text, View, Separator
} from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import * as Actions from '../../actions';

const Lobby = ({
  navigation, flee, id, players
}) => {
  const currentPlayers = Object.keys(players).map(k => <Text key={k}>{players[k].name}</Text>);

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <View style={styles.qrContainer}>
          <Label style={styles.qrLabel}>{id}</Label>
          <QRCode value={Linking.makeUrl('/', { id })} size={200} bgColor="black" fgColor="white" />
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
        <Button block bordered danger style={styles.button} onPress={() => flee()}>
          <Text>Flee</Text>
        </Button>
      </Content>
    </Container>
  );
};

Lobby.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
    state: propTypes.object,
  }).isRequired,
  id: propTypes.string.isRequired,
  players: propTypes.shape().isRequired,
  flee: propTypes.func.isRequired,
};

const mapStateToProps = ({ party: { id, players = {} } }) => ({
  id,
  players,
});
const mapDispatchToProps = { flee: Actions.flee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
