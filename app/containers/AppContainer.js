import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    incrementCounter() {
        this.props.incrementCounter();
    }

    render() {
        return (
            <View>
                <Text> {this.props.counter} </Text>
                <Button onPress={() => this.incrementCounter() } title={"Increment"} > </Button>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
      counter: state.counter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
