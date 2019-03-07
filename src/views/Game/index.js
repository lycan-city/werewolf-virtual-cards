import React, { Component } from 'react';
import {
  Container,
  Content,
  Body,
  Thumbnail,
  Button,
  ListItem,
  Left,
  Icon,
  Right,
  Text,
  Footer,
  FooterTab,
  Tabs,
  Tab,
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
      game, screenplay, killPlayer, gameOver
    } = this.props;
    const playersList = Object.keys(game).map(p => (
      <ListItem avatar key={p}>
        <Left>
          <Thumbnail source={require('../../assets/full-moon.jpg')} />
        </Left>
        <Body>
          <Text style={game[p].alive ? styles.nameAlive : styles.nameDead}>{game[p].name}</Text>
          <Text style={game[p].alive ? styles.roleAlive : styles.roleDead} note>
            {game[p].card.role}
          </Text>
        </Body>
        <Right>
          <Button
            bordered={game[p].alive}
            danger
            onPress={game[p].alive ? () => killPlayer(p) : null}
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
        <Tabs>
          <Tab heading="Players">
            <Content>{playersList}</Content>
          </Tab>
          <Tab heading="Script">
            <Content>{script}</Content>
          </Tab>
        </Tabs>
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
  game: propTypes.shape().isRequired,
  screenplay: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string,
      call: propTypes.string,
    })
  ).isRequired,
  killPlayer: propTypes.func.isRequired,
  gameOver: propTypes.func.isRequired,
};

const mapStateToProps = ({ gamePrep: { screenplay = [] }, game }) => ({
  screenplay,
  game,
});

const mapDispatchToProps = { killPlayer: Actions.killPlayer, gameOver: Actions.gameOver };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
