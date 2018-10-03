import React, { Component } from 'react';
import {
  Container,
  Body,
  Content,
  Thumbnail,
  Button,
  List,
  ListItem,
  Left,
  Icon,
  Right,
  Text,
  Footer,
  FooterTab,
} from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styles from './styles';
import * as Actions from '../../actions';

class Game extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    const {
      players, screenplay, killPlayer, gameOver
    } = this.props;
    const playersList = Object.keys(players).map(p => (
      <ListItem avatar key={p}>
        <Left>
          <Thumbnail source={require('../../assets/full-moon.jpg')} />
        </Left>
        <Body>
          <Text style={players[p].alive ? styles.nameAlive : styles.nameDead}>
            {players[p].name}
          </Text>
          <Text style={players[p].alive ? styles.roleAlive : styles.roleDead} note>
            {players[p].card.role}
          </Text>
        </Body>
        <Right>
          <Button
            bordered={players[p].alive}
            danger
            onPress={players[p].alive ? () => killPlayer(p) : null}
          >
            <Icon type="Foundation" name="skull" style={styles.icon} />
          </Button>
        </Right>
      </ListItem>
    ));
    const script = screenplay.map(c => (
      <ListItem key={c.key}>
        <Text>{c.call}</Text>
      </ListItem>
    ));
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <List>
            <ListItem itemHeader first>
              <Text>Players</Text>
            </ListItem>
            {playersList}
            <ListItem itemHeader>
              <Text>Script</Text>
            </ListItem>
            {script}
          </List>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button block bordered danger style={styles.button} onPress={() => gameOver()}>
              <Text>Game Over</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

Game.propTypes = {
  players: propTypes.shape().isRequired,
  screenplay: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string,
      call: propTypes.string,
    })
  ).isRequired,
  killPlayer: propTypes.func.isRequired,
  gameOver: propTypes.func.isRequired,
};

const mapStateToProps = ({ gamePrep: { screenplay = [] }, game: { players } }) => ({
  screenplay,
  players,
});

const mapDispatchToProps = { killPlayer: Actions.killPlayer, gameOver: Actions.gameOver };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
