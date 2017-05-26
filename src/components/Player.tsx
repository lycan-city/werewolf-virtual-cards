import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export const Player = ({id, name, onKick, onPromote, host, selfId}) => {
    const buttons = [];
    if(host && !(selfId === id)){
        buttons.push(<Button key={`${id}-kick`} title={"Kick"} onPress={() => onKick(id)}/>);
        buttons.push(<Button key={`${id}-prom`} title={"Promote"} onPress={() => onPromote(id)}/>);
    }

    return <View style={{ flex:1 , flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{name}</Text>
            {buttons}
        </View>;
};