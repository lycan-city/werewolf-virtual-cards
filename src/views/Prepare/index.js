import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, View, Button, Icon, Text, Form, Picker, List, ListItem, Left, Right, Switch } from 'native-base';
import styles from './styles'

export default class Prepare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: 'novice',
      lang: 'en',
      mode: 'normal',
      deck: {
        apprentice_seer: 1,
        aura_seer: 0,
        bodyguard: 1,
        cult_leader: 0,
        lycan: 1,
      },
    };
  };

  static navigationOptions = {
    title: 'Virtual Cards',
  };

  onTemplateChange(template){
    this.setState({template});
  };

  onLangChange(lang){
    this.setState({lang});
  };

  setModeTo(mode){
    this.setState({mode});
  };

  increaseCard(card){
    let deck = this.state.deck;
    if(deck[card] > 0) deck[card]++;
    this.setState({deck});
  }

  decreaseCard(card){
    let deck = this.state.deck;
    if(deck[card] > 1) deck[card]--;
    this.setState({deck});
  }

  cardToggle(card){
    let deck = this.state.deck;
    if(deck[card] > 0) deck[card] = 0;
    else deck[card] = 1;
    this.setState({deck});
  }
  
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Button
              iconLeft
              block
              bordered
              success
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back'/>
              <Text> Done </Text>
            </Button>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.templateText}> Start from template: </Text>
              </View>
              <Picker
                iosHeader="Template"
                mode="dropdown"
                inlineLabel
                selectedValue={this.state.template}
                onValueChange={this.onTemplateChange.bind(this)}
              >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Amateur" value="amateur" />
                <Picker.Item label="Basic" value="basic" />
                <Picker.Item label="Competent" value="competent" />
                <Picker.Item label="Novice" value="novice" />
                <Picker.Item label="Vampires" value="vampires" />
                <Picker.Item label="Wolfpack" value="wolfpack" />
                <Picker.Item label="Custom" value="custom" />
              </Picker>
            </View>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.templateText}> Language pack: </Text>
              </View>
              <Picker
                iosHeader="Template"
                mode="dropdown"
                inlineLabel
                selectedValue={this.state.lang}
                onValueChange={this.onLangChange.bind(this)}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
              </Picker>
            </View>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.templateText}> Mode: </Text>
              </View>
              <Button 
                iconLeft
                danger 
                style={styles.button}
                bordered={this.state.mode !== 'chaos'}
                onPress={() => this.setModeTo('chaos')}
                >
                <Icon type="MaterialIcons" name="whatshot"/>
                <Text> Chaos </Text>
              </Button>
              <Button
                iconLeft
                info
                style={styles.button}
                bordered={this.state.mode !== 'normal'}
                onPress={() => this.setModeTo('normal')}
                >
                <Icon type="FontAwesome" name="balance-scale" />
                <Text> Normal </Text>
              </Button>
            </View>
            <List>
              <ListItem itemHeader>
                <Text style={styles.templateText}>Current Deck</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>A</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Switch
                    value={this.state.deck['apprentice_seer'] > 0}
                    onValueChange={() => this.cardToggle('apprentice_seer')}
                    />
                </Left>
                <Body>
                  <Text>Apprentice Seer</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => this.decreaseCard('apprentice_seer')}>
                    <Icon type="Feather" name="minus-square" />
                  </Button>
                  <Text> {this.state.deck['apprentice_seer']} </Text>
                  <Button transparent success onPress={() => this.increaseCard('apprentice_seer')}>
                    <Icon type="Feather" name="plus-square" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Switch 
                    value={this.state.deck['aura_seer'] > 0}
                    onValueChange={() => this.cardToggle('aura_seer')}
                    />
                </Left>
                <Body>
                  <Text>Aura Seer</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => this.decreaseCard('aura_seer')}>
                    <Icon type="Feather" name="minus-square" />
                  </Button>
                  <Text> {this.state.deck['aura_seer']} </Text>
                  <Button transparent success onPress={() => this.increaseCard('aura_seer')}>
                    <Icon type="Feather" name="plus-square" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem itemDivider>
                <Text>B</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Switch 
                    value={this.state.deck['bodyguard'] > 0}
                    onValueChange={() => this.cardToggle('bodyguard')}
                    />
                </Left>
                <Body>
                  <Text>Bodyguard</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => this.decreaseCard('bodyguard')}>
                    <Icon type="Feather" name="minus-square" />
                  </Button>
                  <Text> {this.state.deck['bodyguard']} </Text>
                  <Button transparent success onPress={() => this.increaseCard('bodyguard')}>
                    <Icon type="Feather" name="plus-square" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem itemDivider>
                <Text>C</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Switch 
                    value={this.state.deck['cult_leader'] > 0}
                    onValueChange={() => this.cardToggle('cult_leader')}
                    />
                </Left>
                <Body>
                  <Text>Cult Leader</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => this.decreaseCard('cult_leader')}>
                    <Icon type="Feather" name="minus-square" />
                  </Button>
                  <Text> {this.state.deck['cult_leader']} </Text>
                  <Button transparent success onPress={() => this.increaseCard('cult_leader')}>
                    <Icon type="Feather" name="plus-square" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem itemDivider>
                <Text>L</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Switch 
                    value={this.state.deck['lycan'] > 0}
                    onValueChange={() => this.cardToggle('lycan')}
                    />
                </Left>
                <Body>
                  <Text>Lycan</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => this.decreaseCard('lycan')}>
                    <Icon type="Feather" name="minus-square" />
                  </Button>
                  <Text> {this.state.deck['lycan']} </Text>
                  <Button transparent success onPress={() => this.increaseCard('lycan')}>
                    <Icon type="Feather" name="plus-square" />
                  </Button>
                </Right>
              </ListItem>
            </List>
          </Form>
        </Content>
      </Container>
    );
  }
}
