import React, { Component } from 'react';
import {
  Container,
  Content,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import styles from './styles';
import Db from '../../db';
export default class Home extends Component {
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

  createParty = async e => {
    const party = await this.db.createParty(this.state.name);
    alert(`Party Id: ${party.id}`);
    this.props.navigation.navigate('Lobby', { party });
  };

  onNameChange = name => {
    this.setState({ name });
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={this.onNameChange} />
          </Item>
          <Button
            block
            bordered
            success
            style={styles.button}
            onPress={this.createParty}
          >
            <Text>Create</Text>
          </Button>
          <Button
            block
            bordered
            info
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Join')}
          >
            <Text>Join</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
