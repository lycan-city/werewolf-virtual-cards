import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

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
        ).map(player => <Player key={player.id} {...player} onKick={this.kickPlayer}/>);

        return (
            <View>
                <View>
                    <Text> Party </Text>
                </View>
                <View>
                    <Text> Party size: </Text>
                    <Text> {players.length}</Text>
                </View>
                <Text> Players: </Text>
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