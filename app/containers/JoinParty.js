import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import Camera from 'react-native-camera';

class Party extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       var { width } = Dimensions.get('window');

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
        this.props.joinParty(data)
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