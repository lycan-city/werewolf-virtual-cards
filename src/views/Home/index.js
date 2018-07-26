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
    this.state = {
      name: '',
    };

    this.db = Db.get();
  }

  onNameChange = (name) => {
    this.setState({ name });
  };

  onJoin = () => {
    const { navigation } = this.props;
    navigation.navigate('Join');
  };

  createParty = async () => {
    const { name } = this.state;
    const { navigation } = this.props;
    const party = await this.db.createParty(name);
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

Home.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
};

export default Home;
