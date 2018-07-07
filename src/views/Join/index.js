import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text, Icon, View } from 'native-base';
import styles from './styles';

export default class Join extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    return (
      <Container>
        <Content scrollEnabled={false} contentContainerStyle={styles.content}>
          <Item floatingLabel >
            <Label> Party Code </Label>
            <Input />
          </Item>
          <Button
            iconRight
            block
            bordered
            info
            style={styles.buttonBlock}
            onPress={() => this.props.navigation.navigate('Lobby')}
          >
            <Text> Scan </Text>
            <Icon name='md-qr-scanner' />
          </Button>
          <View style={styles.row}>
            <Button
              iconLeft
              bordered
              dark
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back'/>
              <Text> Back </Text>
            </Button>
            <Button
              iconRight
              bordered
              success
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Lobby')}
            >
              <Text> Join </Text>
              <Icon name='add'/>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
