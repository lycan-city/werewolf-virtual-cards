import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text, Icon, View, Separator, ListItem } from 'native-base';
import QRCode from 'react-native-qrcode';
import styles from './styles'

export default class Join extends Component {

  render() {
    return (
      <Container>
        <Header> 
          <Body>
              <Title>Moe's Party</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.qrContainer}>
            <Label style={styles.qrLabel}> A93F32A </Label>
            <QRCode
              value={'wwvc://A93F32A'}
              size={200}
              bgColor='black'
              fgColor='white'/>
          </View>
           <Separator bordered>
            <Text>Players</Text>
          </Separator>
          <ListItem >
            <Text>Aaron Bennet</Text>
            <Button iconLeft transparent danger>
              <Icon type="FontAwesome" name="ban" />
            </Button>
            <Button iconLeft transparent warning>
              <Icon type="Foundation" name="crown" />
            </Button>
          </ListItem>
          <ListItem>
            <Text>Claire Barclay</Text>
            <Button iconLeft transparent danger>
              <Icon type="FontAwesome" name="ban" />
            </Button>
          </ListItem>
          <ListItem last>
            <Text>Kelso Brittany</Text>
            <Button iconLeft transparent danger>
              <Icon type="FontAwesome" name="ban" />
            </Button>
          </ListItem>
          <ListItem>
            <Text>Caroline Arts</Text>
            <Button iconLeft transparent danger>
              <Icon type="FontAwesome" name="ban" />
            </Button>
          </ListItem>
          <Button block bordered warning style={styles.button}>
            <Text>Prepare</Text>
          </Button>
          <Button block bordered success style={styles.button}>
            <Text>Start</Text>
          </Button>
          <Button block bordered danger style={styles.button}>
            <Text>Flee</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
