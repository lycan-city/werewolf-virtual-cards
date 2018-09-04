import React from 'react';
import { Linking } from 'expo';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  Content,
  Label,
  Button,
  Text,
  View,
  ListItem,
  Footer,
  FooterTab,
} from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import * as Actions from '../../actions';

const Lobby = ({
  navigation, flee, id, name, players, moderator
}) => {
  const currentPlayers = Object.keys(players).map(k => <Text key={k}> {players[k].name} </Text>);

  return (
    <Container style={styles.content}>
      <Content>
        <View style={styles.qrContainer}>
          <Label style={styles.qrLabel}>{id}</Label>
          <QRCode value={Linking.makeUrl('/', { id })} size={200} bgColor="black" fgColor="white" />
        </View>
        <ListItem itemHeader style={styles.titleContainer}>
          <Label style={styles.qrLabel}>{name}</Label>
        </ListItem>
        <View>{currentPlayers}</View>
      </Content>
      <Footer>
        <FooterTab>
          {moderator && (
            <View>
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
            </View>
          )}
          {!moderator && (
            <Button block bordered danger style={styles.button} onPress={() => flee()}>
              <Text>Flee</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </Container>
  );
};

Lobby.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
    state: propTypes.object,
  }).isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  moderator: propTypes.bool.isRequired,
  players: propTypes.shape().isRequired,
  flee: propTypes.func.isRequired,
};

const mapStateToProps = ({
  party: { id, name, players = {} },
  user: {
    attributes: { moderator },
  },
}) => ({
  id,
  name,
  players,
  moderator,
});
const mapDispatchToProps = { flee: Actions.flee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
