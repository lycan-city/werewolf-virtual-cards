import React, { Component } from 'react';
import {
  Container, Content, Item, Input, Label, Button, Text
} from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styles from './styles';
import Db from '../../db';
import * as Actions from '../../actions';

class Home extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor() {
    super();
    this.state = {
      username: '',
    };
    this.db = Db.get();
  }

  onJoin = () => {
    const { navigation, setUsername } = this.props;
    const { username } = this.state;
    setUsername(username);
    navigation.navigate('Join');
  };

  createParty = async () => {
    const { navigation, createParty } = this.props;
    await createParty();
    navigation.navigate('Lobby');
  };

  onNameChange = username => this.setState({ username });

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={this.onNameChange} />
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
  setUsername: propTypes.func.isRequired,
};

const mapStateToProps = (state = {}) => ({ username: state.username });

const mapDispatchToProps = {
  setUsername: Actions.setUsername,
  createParty: Actions.createParty,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
