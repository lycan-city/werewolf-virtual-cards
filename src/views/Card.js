import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card as NativeBaseCard, CardItem, Body, Text } from 'native-base';

export default class Card extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <NativeBaseCard>
            <CardItem>
              <Body>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
          </NativeBaseCard>
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
