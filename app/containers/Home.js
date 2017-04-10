import React, { Component } from 'react';
import {
    View,
    Button,
 } from 'react-native';
import NameInput from '../components/NameInput';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    nameTextInputUpdated(name) {
        this.setState({name: name});
    }

    render() {
        return (
            <View>
                <NameInput
                    userName={this.props.userName}
                    onNameUpdated={name => this.props.getUserInfo(name)} />
                <Button onPress={() => this.props.hostParty()} title={"Host Part"} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.user.name
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
