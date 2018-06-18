import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card as NativeBaseCard, CardItem, Body, Title } from 'native-base';
import FlipCard from 'react-native-flip-card'
import styles from './styles'

export default class Card extends Component {
  render() {
    return (
      <Container>
        <Header> 
          <Body>
						<Title>Virtual Cards</Title>
          </Body>
        </Header>
        <Content scrollEnabled={false}>
          <FlipCard
            flipHorizontal={true}
            flipVertical={false}
          >
            <NativeBaseCard>
              <CardItem style={styles.card}>
                <Body>
                  <Image source={require('../../assets/back.jpg')} style={styles.cardImage}/>
                </Body>
              </CardItem>
            </NativeBaseCard>
            <NativeBaseCard>
              <CardItem style={styles.card}>
                <Body>
                  <Image source={require('../../assets/prince.jpeg')} style={styles.cardImage}/>
                </Body>
              </CardItem>
            </NativeBaseCard>
          </FlipCard>
        </Content>
      </Container>
    );
  }
}
