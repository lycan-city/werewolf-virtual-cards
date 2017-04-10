import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Button,
    TextInput,
 } from 'react-native';

class NameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editting: false
        };
    }

    componentDidMount() {
        if(!this.props.userName)
            this.setState({editting: true});
    }

    render() {
        return <View style={{flexDirection: "row"}}>
            <TextInput
                defaultValue={this.props.userName}
                editable={this.state.editting}
                onChangeText={text => this._textChanged(text)}
                onSubmitEditing={this._donePressed.bind(this)}
                placeholder={"Name"}
                returnKeyType={"go"}
                underlineColorAndroid={(this.state.error == true)? "red": "black"}
                style={{flex: 0.7}} />
            {this._renderButton()}

        </View>;
    }

    _textChanged(name) {
        this.setState({
            userName: name,
            error: false
        });
    }

    _donePressed() {
        if(this.state.userName) {
            this.setState({editting: false});
            this.props.onNameUpdated(this.state.userName);
        } else {
            this.setState({error: true})
        }

    }

    _renderButton() {
        if(this.state.editting)
            return <Button
                title={"Done"}
                onPress={ this._donePressed.bind(this) }
                style={{flex: 0.3}}/>

        return <Button
            title={"edit"}
            onPress={ () => this.setState({editting: true}) }
            style={{flex: 0.3}}/>
    }
}

NameInput.propTypes = {
    userName: PropTypes.string,
    onNameUpdated: PropTypes.func.isRequired
};

export default NameInput;