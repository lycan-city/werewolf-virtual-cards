import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container, Content, Card as NativeBaseCard, CardItem, Body, Text
} from 'native-base';
import FlipCard from 'react-native-flip-card';
import { connect } from 'react-redux';
import { AppLoading, Asset, Constants } from 'expo';
import propTypes from 'prop-types';
import styles from './styles';
import back from '../../assets/back.jpeg';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

class Card extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  loadAssetsAsync = async (front) => {
    const imageAssets = cacheImages([front, back]);

    await Promise.all([...imageAssets]);
  };

  render() {
    const { card, alive } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync(card.url)}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return (
      <Container>
        <Content>
          <FlipCard
            flipHorizontal
            flipVertical={false}
            clickable={alive}
            flip={!alive}
            perspective={1000}
            useNativeDriver
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
                  <Text style={styles.role}>{card.role}</Text>
                  <Text style={styles.description}>{card.description}</Text>
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

const mapStateToProps = ({ game }) => game[Constants.deviceId] || { card: {}, alive: true };

export default connect(mapStateToProps)(Card);
