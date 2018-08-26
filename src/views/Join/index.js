import React, { Component } from 'react';
import { Linking, Camera, Permissions } from 'expo';
import {
  Container, Content, Item, Input, Label, Button, Text, Icon, View
} from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { joinParty } from '../../actions';

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
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { partyId = '' } = params;
    this.setState({ partyId });
    if (partyId) this.join();
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
      () => this.join()
    );
  };

  openCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      Alert.alert(
        'Camera permissions have been denied. Go into your settings and allow camera access.'
      );
    }

    this.setState({
      openCamera: status === 'granted',
    });
  };

  join = () => this.props.joinParty(this.state.partyId);

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
            <Button iconRight bordered success style={styles.button} onPress={this.join}>
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
  joinParty: propTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = { joinParty };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
