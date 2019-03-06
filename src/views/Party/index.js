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
  Footer,
  Icon,
  FooterTab,
} from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import * as Actions from '../../actions';

const Party = ({
  navigation, flee, createGame, id, name, players, moderator, promote, kick
}) => {
  const currentPlayers = Object.keys(players).map(k => (
    <ListItem key={k}>
      <Animatable.View animation="lightSpeedIn" style={styles.listItem}>
        <Text style={Constants.deviceId === k ? styles.currentPlayer : {}}>{players[k].name}</Text>
        {moderator && Constants.deviceId !== k && (
          <View style={styles.options}>
            <Icon
              type="Foundation"
              name="crown"
              style={styles.inactiveCrown}
              onPress={() => promote(Constants.deviceId, k)}
            />
            <Icon type="Entypo" name="block" style={styles.kick} onPress={() => kick(k)} />
          </View>
        )}
        {players[k].moderator && (
          <View style={styles.options}>
            <Icon type="Foundation" name="crown" style={styles.activeCrown} />
          </View>
        )}
      </Animatable.View>
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
          {(!moderator || currentPlayers.length === 1) && (
            <Button block bordered danger style={styles.button} onPress={() => flee()}>
              <Text>Flee</Text>
            </Button>
          )}
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
        </FooterTab>
      </Footer>
    </Container>
  );
};

Party.propTypes = {
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
  kick: propTypes.func.isRequired,
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
  kick: Actions.kick,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Party);
