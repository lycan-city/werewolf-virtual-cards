import React, { Component } from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  View,
} from 'native-base';

import styles from './styles';
import Db from '../../db';

export default class Join extends Component {
  constructor() {
    super();
    this.state = {
      partyId: '',
    };

    this.db = Db.get();
  }

  static navigationOptions = {
    title: 'Virtual Cards',
  };

  onChangeText = partyId => {
    this.setState({
      partyId,
    });
  };

  getParty = async () => {
    const { partyId } = this.state;
    const party = await this.db.getPartyById(partyId);

    console.log({ party });

    if (!party) {
      alert(`No party with id ${partyId}`);
      return;
    }

    this.props.navigation.navigate('Lobby', { party });
  };

  render() {
    return (
      <Container>
        <Content scrollEnabled={false} contentContainerStyle={styles.content}>
          <Item floatingLabel>
            <Label>Party Code</Label>
            <Input
              value={this.state.partyId}
              onChangeText={this.onChangeText}
              required
            />
          </Item>
          <Button
            iconRight
            block
            bordered
            info
            style={styles.buttonBlock}
            onPress={() => this.props.navigation.navigate('Lobby')}
          >
            <Text>Scan</Text>
            <Icon name="md-qr-scanner" />
          </Button>
          <View style={styles.row}>
            <Button
              iconLeft
              bordered
              dark
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
            <Button
              iconRight
              bordered
              success
              style={styles.button}
              onPress={this.getParty}
            >
              <Text>Join</Text>
              <Icon name="add" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
