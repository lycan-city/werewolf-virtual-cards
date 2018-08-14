import React, { Component } from 'react';
import {
  Container, Content, Item, Input, Label, Button, Text
} from 'native-base';
import propTypes from 'prop-types';
import styles from './styles';

import Db from '../../db';

class Home extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor() {
    super();
    this.store = {};
    this.db = Db.get();
  }

  componentWillMount() {
    const { store } = this.context;
    this.store = store;
  }

  onNameChange = (name) => {
    this.store.dispatch({
      type: 'SET_USER',
      username: name,
    });
  };

  onJoin = () => {
    const { navigation } = this.props;
    navigation.navigate('Join');
  };

  createParty = async () => {
    const { username } = this.store.getState();
    const { navigation } = this.props;
    const party = await this.db.createParty(`${username}'s party`);
    navigation.navigate('Lobby', { party });
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={this.onNameChange} />
          </Item>
          <Button block bordered success style={styles.button} onPress={this.createParty}>
            <Text>Create</Text>
          </Button>
          <Button block bordered info style={styles.button} onPress={this.onJoin}>
            <Text>Join</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

Home.contextTypes = {
  store: propTypes.shape({
    dispatch: propTypes.func,
  }),
};

Home.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
};

export default Home;
