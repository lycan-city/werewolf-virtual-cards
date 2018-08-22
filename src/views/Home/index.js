import React, { Component } from 'react';
import {
  Container, Content, Item, Input, Label, Button, Text
} from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styles from './styles';
import Db from '../../db';
import setUsername from '../../actions/user';

const mapStateToProps = (state = {}) => ({ username: state.username });

const mapDispatchToProps = dispatch => ({
  onNameChange: (name) => {
    dispatch(setUsername(name));
  },
});

class Home extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor() {
    super();
    this.db = Db.get();
  }

  onJoin = () => {
    const { navigation } = this.props;
    navigation.navigate('Join');
  };

  createParty = async () => {
    const { navigation, username } = this.props;
    const party = await this.db.createParty(`${username}'s party`);
    navigation.navigate('Lobby', { party });
  };

  render() {
    const { onNameChange } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={onNameChange} />
          </Item>
          <Button block bordered success style={styles.button} onPress={this.createParty}>
            <Text>Create</Text>
          </Button>
          <Button block bordered info style={styles.button} onPress={this.onJoin}>
            <Text>Join</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
  onNameChange: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
