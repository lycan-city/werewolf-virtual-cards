import React, { Component } from 'react';

import {
    View,
    Button,
    Text
 } from 'react-native';

import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
             <View>
                <Text> {this.props.counter} </Text>
                <Button onPress={() => this.props.incrementCounter()} title={"Increment"} > </Button>
                <Button onPress={() => this.props.hostParty()} title={"Host Part"}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);