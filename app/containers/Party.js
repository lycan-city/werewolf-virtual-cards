import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import QRCode from 'react-native-qrcode';
import Player from '../components/Player';

class Party extends Component {
    constructor(props) {
        super(props);
    }

    kickPlayer(id) {
        console.log(`player id ${id} kicked`);
    }

    render() {
        const players = (
            this.props.party &&
            this.props.party.players  || []
        ).map(player => <Player key={`${player.id}${player.name}`} {...player} onKick={this.kickPlayer}/>);

        var { width } = Dimensions.get('window');

        return (
            <View>
                <View style={{padding: width * 0.1}}>
                    <QRCode
                        value={this.props.party && this.props.party.id}
                        size={width * 0.8}
                        bgColor='black'
                        fgColor='#E9E9EF' />
                </ View>
                <View style={{flexDirection: "row" }}>
                    <Text> Party size: </Text>
                    <Text> {players.length}</Text>
                </View>
                <ScrollView >
                    {players}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        party: state.party
    };
}


export default connect(mapStateToProps)(Party);