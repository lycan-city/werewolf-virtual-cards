import React, { Component } from 'react';
import {
  Container,
  Body,
  Content,
  View,
  Button,
  Icon,
  Text,
  Form,
  Picker,
  List,
  ListItem,
  Left,
  Right,
  Switch,
} from 'native-base';
import propTypes from 'prop-types';
import styles from './styles';

class Prepare extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

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
  }

  onTemplateChange(template) {
    this.setState({ template });
  }

  onLangChange(lang) {
    this.setState({ lang });
  }

  setModeTo(mode) {
    this.setState({ mode });
  }

  increaseCard(card) {
    const { deck } = this.state;
    if (deck[card] > 0) deck[card] += 1;
    this.setState({ deck });
  }

  decreaseCard(card) {
    const { deck } = this.state;
    if (deck[card] > 1) deck[card] -= 1;
    this.setState({ deck });
  }

  cardToggle(card) {
    const { deck } = this.state;
    if (deck[card] > 0) deck[card] = 0;
    else deck[card] = 1;
    this.setState({ deck });
  }

  render() {
    const { navigation } = this.props;
    const {
      template, lang, mode, deck
    } = this.state;
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Form>
            <Button
              iconLeft
              block
              bordered
              success
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" />
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
                selectedValue={template}
                onValueChange={() => this.onTemplateChange()}
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
                selectedValue={lang}
                onValueChange={() => this.onLangChange()}
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
                bordered={mode !== 'chaos'}
                onPress={() => this.setModeTo('chaos')}
              >
                <Icon type="MaterialIcons" name="whatshot" />
                <Text> Chaos </Text>
              </Button>
              <Button
                iconLeft
                info
                style={styles.button}
                bordered={mode !== 'normal'}
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
                    value={deck.apprentice_seer > 0}
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
                  <Text> {deck.apprentice_seer} </Text>
                  <Button transparent success onPress={() => this.increaseCard('apprentice_seer')}>
                    <Icon type="Feather" name="plus-square" />
                  </Button>
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Switch
                    value={deck.aura_seer > 0}
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
                  <Text> {deck.aura_seer} </Text>
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
                    value={deck.bodyguard > 0}
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
                  <Text> {deck.bodyguard} </Text>
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
                    value={deck.cult_leader > 0}
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
                  <Text> {deck.cult_leader} </Text>
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
                  <Switch value={deck.lycan > 0} onValueChange={() => this.cardToggle('lycan')} />
                </Left>
                <Body>
                  <Text>Lycan</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => this.decreaseCard('lycan')}>
                    <Icon type="Feather" name="minus-square" />
                  </Button>
                  <Text> {deck.lycan} </Text>
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

Prepare.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
};

export default Prepare;
