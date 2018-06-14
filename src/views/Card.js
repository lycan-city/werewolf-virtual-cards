import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Card as NativeBaseCard, CardItem, Body, Text } from 'native-base';

export default class Card extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content scrollEnabled={false}>
          <NativeBaseCard>
            <CardItem>
              <Image source={require('../assets/prince.jpeg')} resizeMode='contain' style={styles.cardImage} />
            </CardItem>
          </NativeBaseCard>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 600
  },
});

