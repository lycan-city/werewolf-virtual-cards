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
  Footer,
  FooterTab,
} from 'native-base';
import brain from 'werewolf-brain';
import propTypes from 'prop-types';
import styles from './styles';

class Prepare extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor(props) {
    super(props);
    this.decks = brain.getDecks();
    this.languages = [{ key: 'en', value: 'English' }, { key: 'es', value: 'Spanish' }];
    this.state = {
      template: 'basic',
      lang: 'en',
      mode: 'normal',
      deck: this.decks.basic,
      detailedDeck: brain.translateDeck(this.decks.basic),
    };
  }

  onTemplateChange(template) {
    const { lang } = this.state;
    const deck = this.decks[template];
    const detailedDeck = brain
      .translateDeck(deck, lang)
      .sort((a, b) => a.role.localeCompare(b.role));
    this.setState({ template, deck, detailedDeck });
  }

  onLangChange(lang) {
    const { deck } = this.state;
    const detailedDeck = brain
      .translateDeck(deck, lang)
      .sort((a, b) => a.role.localeCompare(b.role));
    this.setState({ lang, detailedDeck });
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
      template, lang, mode, deck, detailedDeck
    } = this.state;
    const decks = Object.keys(this.decks).map(d => <Picker.Item key={d} label={d} value={d} />);
    const languages = this.languages.map(l => (
      <Picker.Item key={l.key} label={l.value} value={l.key} />
    ));
    const currentDeck = detailedDeck.map(c => (
      <ListItem icon key={c.key}>
        <Left>
          <Switch value={deck[c.key] > 0} onValueChange={() => this.cardToggle(c.key)} />
        </Left>
        <Body>
          <Text>{c.role}</Text>
        </Body>
        <Right>
          <Button transparent danger onPress={() => this.decreaseCard(c.key)}>
            <Icon type="Feather" name="minus-square" />
          </Button>
          <Text> {deck[c.key]} </Text>
          <Button transparent success onPress={() => this.increaseCard(c.key)}>
            <Icon type="Feather" name="plus-square" />
          </Button>
        </Right>
      </ListItem>
    ));
    return (
      <Container style={styles.content}>
        <Content>
          <Form>
            <View style={styles.row}>
              <View style={styles.center}>
                <Text style={styles.templateText}> Start from template: </Text>
              </View>
              <Picker
                iosHeader="Template"
                mode="dropdown"
                inlineLabel
                selectedValue={template}
                onValueChange={t => this.onTemplateChange(t)}
              >
                {decks}
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
                onValueChange={l => this.onLangChange(l)}
              >
                {languages}
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
              {currentDeck}
            </List>
          </Form>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button
              block
              bordered
              success
              style={styles.footerButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" />
              <Text> Done </Text>
            </Button>
          </FooterTab>
        </Footer>
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
