import React, { Component } from 'react';
import {
    View,
    Button,
    Text
 } from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
             <View>
                <Text> {this.props.counter} </Text>
                <Button onPress={() => this.props.incrementCounter() } title={"Increment"} > </Button>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(Home);