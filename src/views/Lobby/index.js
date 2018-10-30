import React from 'react';
import { Constants, Linking } from 'expo';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  Content,
  Label,
  Button,
  Text,
  View,
  List,
  ListItem,
  Left,
  Footer,
  Right,
  Icon,
  FooterTab,
} from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import * as Actions from '../../actions';

const Lobby = ({
  navigation, flee, createGame, id, name, players, moderator, promote
}) => {
  const currentPlayers = Object.keys(players).map(k => (
    <ListItem key={k} selected={Constants.deviceId === k}>
      <Left>
        <Animatable.Text animation="lightSpeedIn">{players[k].name}</Animatable.Text>
      </Left>
      {moderator
        && Constants.deviceId !== k && (
          <Right>
            <Icon type="Foundation" name="crown" onPress={() => promote(Constants.deviceId, k)} />
          </Right>
      )}
      {players[k].moderator && (
        <Right>
          <Icon type="Foundation" name="crown" style={styles.activeCrown} />
        </Right>
      )}
    </ListItem>
  ));

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
        <List>{currentPlayers}</List>
      </Content>
      <Footer style={styles.footer}>
        <FooterTab>
          {moderator && (
            <Button
              block
              bordered
              warning
              style={styles.button}
              onPress={() => navigation.navigate('Prepare')}
            >
              <Text>Prepare</Text>
            </Button>
          )}
          {moderator && (
            <Button block bordered success style={styles.button} onPress={() => createGame()}>
              <Text>Start</Text>
            </Button>
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
  createGame: propTypes.func.isRequired,
  promote: propTypes.func.isRequired,
};

const mapStateToProps = ({ party: { id, name, players = {} } }) => ({
  id,
  name,
  players,
  moderator: players[Constants.deviceId] ? !!players[Constants.deviceId].moderator : false,
});
const mapDispatchToProps = {
  flee: Actions.flee,
  createGame: Actions.createGame,
  promote: Actions.promote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
