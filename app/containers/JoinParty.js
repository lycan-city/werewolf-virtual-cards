import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
    View,
    StyleSheet,
    Vibration,
} from 'react-native';
import Camera from 'react-native-camera';

class Party extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    onBarCodeRead={this._barCodeRead.bind(this)} >
                </Camera>
            </View>
        );
    }

    _barCodeRead({type, data}) {
        if(this.state.scanning)
            return;
        Vibration.vibrate(40);
        this.setState({scanning: true});
        this.props.joinParty(data);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});

function mapStateToProps(state) {
    return { };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(ActionCreators, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Party);