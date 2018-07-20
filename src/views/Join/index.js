import React, { Component } from 'react';
import { Linking } from 'expo';
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

import { Camera, Permissions } from 'expo';
import { TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Db from '../../db';

export default class Join extends Component {
  constructor() {
    super();
    this.state = {
      partyId: '',
      hasCameraPermission: null,
      openCamera: false,
      invalidCameraState: false,
    };

    this.db = Db.get();
  }

  static navigationOptions = {
    title: 'Virtual Cards',
  };

  componentDidMount() {
    this.setState(
      {
        partyId: this.props.navigation.state.params.partyId || '',
      },
      () => {
        if (this.state.partyId) this.getParty();
      }
    );
  }

  onChangeText = partyId => {
    this.setState({
      partyId,
    });
  };

  getParty = async () => {
    const { partyId } = this.state;
    const party = await this.db.getPartyById(partyId);

    if (!party) {
      alert(`No party with id ${partyId}`);
      return;
    }

    this.props.navigation.navigate('Lobby', { party });
  };

  openCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      alert(
        'Camera permissions have been denied. Go into your settings and allow camera access.'
      );
    }

    this.setState({
      hasCameraPermission: status === 'granted',
      openCamera: status === 'granted',
    });
  };

  onBarCodeRead = qr => {
    if (this.state.invalidCameraState) {
      return;
    }

    const partyId = Linking.parse(qr.data).queryParams.id;

    if (!partyId) {
      this.setState({ invalidCameraState: true });
      Alert.alert('Invalid QR', `QR: ${qr.data} is not a valid party`, [
        {
          text: 'OK',
          onPress: () => this.setState({ invalidCameraState: false }),
        },
      ]);
      return;
    }

    this.setState(
      {
        partyId,
        openCamera: false,
      },
      () => this.getParty()
    );
  };

  render() {
    if (this.state.openCamera) {
      return (
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          onBarCodeRead={this.onBarCodeRead}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            />
          </View>
        </Camera>
      );
    }

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
            onPress={this.openCamera}
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
