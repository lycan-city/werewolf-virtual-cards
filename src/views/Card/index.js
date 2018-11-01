import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import {
  Container, Content, Card as NativeBaseCard, CardItem, Body, Text
} from 'native-base';
import { connect } from 'react-redux';
import { AppLoading, Asset, Constants } from 'expo';
import propTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import back from '../../assets/back.jpeg';

Animatable.initializeRegistryWithDefinitions({
  flipCard: {
    easing: 'ease-in',
    style: {
      backfaceVisibility: 'visible',
      perspective: 400,
    },
    0: {
      rotateY: '90deg',
    },
    0.4: {
      rotateY: '-20deg',
    },
    0.6: {
      rotateY: '10deg',
    },
    0.8: {
      rotateY: '-5deg',
    },
    1: {
      rotateY: '0deg',
    },
  },
});

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
      isFlipped: false,
    };
    this.image = {};
  }

  loadAssetsAsync = front => async () => {
    const imageAssets = cacheImages([front, back]);
    await Promise.all([...imageAssets]);
  };

  handleRef = (ref) => {
    this.image = ref;
  };

  handlePress = () => {
    const { isFlipped } = this.state;
    this.setState({ isFlipped: !isFlipped });
    this.image.flipCard();
  };

  render() {
    const { card, alive } = this.props;
    const { isReady, isFlipped } = this.state;
    const isFrontVisible = isFlipped || !alive;

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
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animatable.View ref={this.handleRef}>
              <NativeBaseCard>
                <CardItem style={styles.card}>
                  <Body>
                    <Image
                      source={{ uri: card.url }}
                      style={isFrontVisible ? styles.cardImage : styles.imageHidden}
                    />
                    <Image
                      source={back}
                      style={isFrontVisible ? styles.imageHidden : styles.cardImage}
                    />
                    {isFrontVisible && <Text style={styles.role}>{card.role}</Text>}
                    {isFrontVisible && <Text style={styles.description}>{card.description}</Text>}
                  </Body>
                </CardItem>
              </NativeBaseCard>
            </Animatable.View>
          </TouchableWithoutFeedback>
        </Content>
      </Container>
    );
  }
}

Card.propTypes = {
  card: propTypes.shape().isRequired,
  alive: propTypes.bool.isRequired,
};

const mapStateToProps = ({
  game: {
    [Constants.deviceId]: { card = {}, alive = true },
  },
}) => ({
  card,
  alive,
});

export default connect(mapStateToProps)(Card);
