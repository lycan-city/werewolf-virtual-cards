import React, { Component } from 'react';
import { Linking, BarCodeScanner, Permissions } from 'expo';
import {
  Container, Content, Item, Input, Label, Button, Text, Icon, View
} from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Alert, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import * as Actions from '../../actions';

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
    this.setState({ partyId }, () => {
      if (partyId) this.join();
    });
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

  join = () => {
    const { joinParty } = this.props;
    const { partyId } = this.state;

    if (!partyId) {
      Alert.alert('Join failed', "Can't join party without code.");
    } else {
      joinParty(partyId);
    }
  };

  render() {
    const { openCamera, partyId } = this.state;
    const { navigation, alert, clearAlert } = this.props;
    if (alert.show) {
      Alert.alert(alert.title, alert.message, [{ text: 'OK', onPress: clearAlert }]);
    }
    if (openCamera) {
      return <BarCodeScanner style={styles.camera} onBarCodeScanned={this.onBarCodeRead} />;
    }

    return (
      <Container>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding" enabled>
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
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

Join.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
  alert: propTypes.shape().isRequired,
  joinParty: propTypes.func.isRequired,
  clearAlert: propTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user, alert: state.alert });
const mapDispatchToProps = { joinParty: Actions.joinParty, clearAlert: Actions.clearAlert };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
