import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container, Content, Card as NativeBaseCard, CardItem, Body
} from 'native-base';
import FlipCard from 'react-native-flip-card';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import propTypes from 'prop-types';
import styles from './styles';

const back = require('../../assets/back.jpeg');

class Card extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    const { card, alive } = this.props;

    return (
      <Container>
        <Content>
          <FlipCard
            flipHorizontal
            flipVertical={false}
            clickable={alive}
            flip={!alive}
            perspective={1000}
          >
            <NativeBaseCard>
              <CardItem style={styles.card}>
                <Body>
                  <Image source={back} style={styles.cardImage} />
                </Body>
              </CardItem>
            </NativeBaseCard>
            <NativeBaseCard>
              <CardItem style={styles.card}>
                <Body>
                  <Image source={{ uri: card.url }} style={styles.cardImage} />
                </Body>
              </CardItem>
            </NativeBaseCard>
          </FlipCard>
        </Content>
      </Container>
    );
  }
}

Card.propTypes = {
  card: propTypes.shape().isRequired,
  alive: propTypes.bool.isRequired,
};

const mapStateToProps = ({ game }) => game[Constants.deviceId] || {};

export default connect(mapStateToProps)(Card);
