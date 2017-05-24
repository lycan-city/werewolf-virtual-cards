import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    TextInput,
    TouchableOpacity,
 } from 'react-native';

export class NameInput extends React.Component<any, any> {
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
        return <View style={{flexDirection: "row", padding: 30}}>
            <TextInput
                defaultValue={this.props.userName}
                editable={this.state.editting}
                onChangeText={text => this.textChanged(text)}
                onSubmitEditing={this._donePressed.bind(this)}
                placeholder={"Name"}
                returnKeyType={"go"}
                underlineColorAndroid={(this.state.error === true)? "red": "black"}
                style={{flex: 0.7}} />
            <View style={{ paddingLeft:20, paddingTop: 10, flexDirection: "column", justifyContent: "center"}}>
                <View>
                    {this._renderButton()}
                </View>
            </View>
        </View>;
    }

    private textChanged(name) {
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
            return <TouchableOpacity onPress={this._donePressed.bind(this)}>
                    <Icon name="check" size={20}/>
                </TouchableOpacity>;

        return <TouchableOpacity onPress={() => this.setState({editting: true})}>
                <Icon name="pencil"  size={25}/>
            </TouchableOpacity>;
    }
}