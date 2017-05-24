import React from 'react';
import {
    View,
    Button,
 } from 'react-native';
import { NameInput } from '../components/NameInput';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';

class Home extends React.Component<any, any> {
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
                <View style={{padding: 20, flexDirection: "row", justifyContent:"space-around"}}>
                    <Button onPress={() => this.props.hostParty()} title={"Host Party"} />
                    <Button onPress={() => this.props.getPartyInfo()} title={"Join Party"} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.user.name
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ActionCreators as any, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
