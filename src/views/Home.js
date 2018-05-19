import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text } from 'native-base';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header> 
          <Body>
              <Title>Virtual Cards</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label> Nombre </Label>
            <Input />
          </Item>
          <Button block bordered success style={styles.button}>
            <Text>Create</Text>
          </Button>
          <Button block bordered info style={styles.button}>
            <Text>Join</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  },
});
