import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Player } from '../components/Player';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

class Party extends React.Component<any, any> {
    render() {
        const players = (
            this.props.party &&
            this.props.party.players || []
        ).map(player => <Player
            key={`${player.id}${player.name}`}
            {...player}
            selfId={this.props.selfId}
            host={this.props.hostId === this.props.selfId}
            onKicked={() => this.props.kickPlayer(player.id)}
            onPromoted={() => this.props.promotePlayer(player.id)}
        />);
        const { width } = Dimensions.get('window');

        return (
            <View>
                <View style={{ padding: width * 0.1 }}>
                    <QRCode
                        value={this.props.party && this.props.party.id}
                        size={width * 0.8}
                        bgColor='black'
                        fgColor='#E9E9EF' />
                </ View>
                <View style={{ flexDirection: "row" }}>
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

const mapStateToProps = state => ({
    party: state.party,
    selfId: state.user.id,
    hostId: state.party &&
    state.party.users &&
    state.party.users.find(u => u.host) &&
    state.party.users.find(u => u.host).id
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators as any, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Party);