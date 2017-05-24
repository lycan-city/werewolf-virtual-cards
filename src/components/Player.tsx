import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export const Player = ({id, name, onKick}: any) =>
    <View style={{ flex:1 , flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{name}</Text>
        <Button title={"Kick"} onPress={() => onKick(id)}/>
    </View>
;