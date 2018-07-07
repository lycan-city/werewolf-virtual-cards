import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Thumbnail, Button, List, ListItem, Left, Icon, Right, Text } from 'native-base';
import styles from './styles'

export default class Game extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
					<List>
            <ListItem itemHeader first>
              <Text>Players</Text>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../assets/full-moon.jpg')} />
              </Left>
              <Body>
                <Text style={styles.name}>Steve</Text>
                <Text style={styles.role} note>Villager</Text>
              </Body>
              <Right>
                <Button bordered danger>
                  <Icon type="Foundation" name="skull" style={styles.icon} />
                </Button>
              </Right>
            </ListItem>
						<ListItem avatar>
              <Left>
                <Thumbnail source={require('../../assets/full-moon.jpg')} />
              </Left>
              <Body>
                <Text style={styles.name} >Jane</Text>
                <Text style={styles.role} note>Seer</Text>
              </Body> 
              <Right>
                <Button bordered danger>
                  <Icon type="Foundation" name="skull" style={styles.icon}/>
                </Button>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../assets/full-moon.jpg')} />
              </Left>
              <Body>
                <Text style={styles.name} >Bill</Text>
                <Text style={styles.role} note>Bodyguard</Text>
              </Body> 
              <Right>
                <Button bordered danger>
                  <Icon type="Foundation" name="skull" style={styles.icon}/>
                </Button>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../assets/full-moon.jpg')} />
              </Left>
              <Body>
                <Text style={styles.name} >Mike</Text>
                <Text style={styles.role} note>Werewolf</Text>
              </Body> 
              <Right>
                <Button bordered danger>
                  <Icon type="Foundation" name="skull" style={styles.icon}/>
                </Button>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../assets/full-moon.jpg')} />
              </Left>
              <Body>
                <Text style={styles.name} >Paco</Text>
                <Text style={styles.role} note>Villager</Text>
              </Body> 
              <Right>
                <Button bordered danger>
                  <Icon type="Foundation" name="skull" style={styles.icon}/>
                </Button>
              </Right>
            </ListItem>
            <ListItem itemHeader>
              <Text>Script</Text>
            </ListItem>
            <ListItem>
              <Text>Wake up Bodyguard, choose a player to protect.</Text>
            </ListItem>
            <ListItem>
              <Text>Werewolves, choose a player to kill.</Text>
            </ListItem>
            <ListItem>
              <Text>Wake up Seer, check a player.</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
