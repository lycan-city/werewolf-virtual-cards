import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text } from 'native-base';
import styles from './styles';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label> Nombre </Label>
            <Input />
          </Item>
          <Button
            block 
            bordered
            success
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Lobby')}
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
