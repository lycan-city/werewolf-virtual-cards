import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container, Content, Card as NativeBaseCard, CardItem, Body
} from 'native-base';
import FlipCard from 'react-native-flip-card';
import styles from './styles';

export default class Card extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    return (
      <Container>
        <Content scrollEnabled={false}>
          <FlipCard flipHorizontal flipVertical={false}>
            <NativeBaseCard>
              <CardItem style={styles.card}>
                <Body>
                  <Image source={require('../../assets/back.jpg')} style={styles.cardImage} />
                </Body>
              </CardItem>
            </NativeBaseCard>
            <NativeBaseCard>
              <CardItem style={styles.card}>
                <Body>
                  <Image source={require('../../assets/prince.jpeg')} style={styles.cardImage} />
                </Body>
              </CardItem>
            </NativeBaseCard>
          </FlipCard>
        </Content>
      </Container>
    );
  }
}
