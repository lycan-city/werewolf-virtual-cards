import React, { Component } from 'react';
import { Linking, Camera, Permissions } from 'expo';
import {
  Container, Content, Item, Input, Label, Button, Text, Icon, View
} from 'native-base';
import propTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Db from '../../db';

class Join extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor() {
    super();
    this.state = {
      partyId: '',
      openCamera: false,
      invalidCameraState: false,
    };

    this.db = Db.get();
  }

  componentDidMount() {
    const { partyId } = this.state;
    const { navigation } = this.props;
    let id = partyId;

    if (navigation.state.params) {
      const { params } = navigation.state;
      id = params.partyId;
    }
    this.setState(
      {
        partyId: id,
      },
      () => {
        if (partyId) this.getParty();
      }
    );
  }

  onChangeText = (partyId) => {
    this.setState({
      partyId,
    });
  };

  onBarCodeRead = (qr) => {
    const { invalidCameraState } = this.state;
    if (invalidCameraState) {
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

  getParty = async () => {
    const { partyId } = this.state;
    const { navigation } = this.props;
    const party = await this.db.getPartyById(partyId);

    if (!party) {
      // alert(`No party with id ${partyId}`);
      return;
    }

    navigation.navigate('Lobby', { party });
  };

  openCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      // eslint-disable-next-line no-alert
      alert('Camera permissions have been denied. Go into your settings and allow camera access.');
    }

    this.setState({
      openCamera: status === 'granted',
    });
  };

  render() {
    const { openCamera, type, partyId } = this.state;
    const { navigation } = this.props;
    if (openCamera) {
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
                    type === Camera.Constants.Type.back
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
            <Input value={partyId} onChangeText={this.onChangeText} required />
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
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
            <Button iconRight bordered success style={styles.button} onPress={this.getParty}>
              <Text>Join</Text>
              <Icon name="add" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

Join.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
};

export default Join;
