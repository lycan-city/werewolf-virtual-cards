import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import * as Actions from '../../actions';

class Prepare extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor(props) {
    super(props);
    this.decks = brain.getDecks();
    this.languages = brain.getLanguages();

    const {
      deckName, language, mode, deck
    } = this.props;
    const detailedDeck = brain.translateDeck(deck, language);

    this.state = {
      deckName,
      language,
      mode,
      deck,
      detailedDeck,
    };
  }

  onTemplateChange(deckName) {
    if (deckName === 'custom') {
      this.setState({ deckName });
      return;
    }

    const { language } = this.state;
    const deck = this.decks[deckName];
    const detailedDeck = brain
      .translateDeck(deck, language)
      .sort((a, b) => a.role.localeCompare(b.role));
    this.setState({
      deckName,
      deck,
      detailedDeck,
    });
  }

  onLangChange(language) {
    const { deck } = this.state;
    const detailedDeck = brain
      .translateDeck(deck, language)
      .sort((a, b) => a.role.localeCompare(b.role));
    this.setState({ language, detailedDeck });
  }

  setModeTo(mode) {
    this.setState({ mode });
  }

  increaseCard(card) {
    const { deck } = this.state;
    if (deck[card] > 0) deck[card] += 1;
    this.setState({ deck, deckName: 'custom' });
  }

  decreaseCard(card) {
    const { deck } = this.state;
    if (deck[card] > 1) deck[card] -= 1;
    this.setState({ deck, deckName: 'custom' });
  }

  cardToggle(card) {
    const { deck } = this.state;
    if (deck[card] > 0) deck[card] = 0;
    else deck[card] = 1;
    this.setState({ deck, deckName: 'custom' });
  }

  preparedGame() {
    const {
      language, mode, deck, deckName
    } = this.state;
    return {
      language,
      mode,
      deckName,
      deck,
    };
  }

  render() {
    const { prepareGame } = this.props;
    const {
      deckName, language, mode, deck, detailedDeck
    } = this.state;

    const decks = Object.keys(this.decks)
      .concat(['custom'])
      .map(d => <Picker.Item key={d} label={d} value={d} />);

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
                selectedValue={deckName}
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
                selectedValue={language}
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
              onPress={() => prepareGame(this.preparedGame())}
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
  prepareGame: propTypes.func.isRequired,
  deckName: propTypes.string.isRequired,
  language: propTypes.string.isRequired,
  mode: propTypes.string.isRequired,
  deck: propTypes.shape().isRequired,
};

const mapStateToProps = ({
  settings: {
    deckName, language, mode, deck
  }
}) => ({
  deckName,
  language,
  mode,
  deck,
});

const mapDispatchToProps = { prepareGame: Actions.prepareGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prepare);
