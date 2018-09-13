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
} from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styles from './styles';

class Game extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    const { players, deck, screenplay } = this.props;
    const playersList = Object.keys(deck).map(p => (
      <ListItem avatar key={p}>
        <Left>
          <Thumbnail source={require('../../assets/full-moon.jpg')} />
        </Left>
        <Body>
          <Text style={styles.name}>{players[p].name}</Text>
          <Text style={styles.role} note>
            {deck[p].role}
          </Text>
        </Body>
        <Right>
          <Button bordered danger>
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
      </Container>
    );
  }
}

Game.propTypes = {
  players: propTypes.shape().isRequired,
  deck: propTypes.shape().isRequired,
  screenplay: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string,
      call: propTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = ({ party: { players = {} }, game: { deck = {}, screenplay = [] } }) => ({
  players,
  deck,
  screenplay,
});

export default connect(mapStateToProps)(Game);
