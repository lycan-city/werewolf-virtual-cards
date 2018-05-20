import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text, Icon, View } from 'native-base';

export default class Join extends Component {
  render() {
    return (
      <Container>
        <Header> 
          <Body>
              <Title>Virtual Cards</Title>
          </Body>
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={styles.content}>
          <Item floatingLabel >
            <Label> Party Code </Label>
            <Input />
          </Item>
          <Button iconRight block bordered info style={styles.button}>
            <Text> Scan </Text>
            <Icon name='md-qr-scanner' />
          </Button>
          <View style={styles.row}>
            <Button iconLeft bordered dark style={styles.button}>
              <Icon name='arrow-back'/>
              <Text> Back </Text>
            </Button>
            <Button iconRight bordered success style={styles.button}>
              <Text> Join </Text>
              <Icon name='add'/>
            </Button>
          </View>
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
  row: {
    flexDirection: 'row'
  },
  button: {
    marginTop: 10,
    marginRight: 20
  },
});
