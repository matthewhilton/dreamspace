import React from 'react';
import {View } from 'react-native';
import {IconButton} from 'react-native-paper';

const ActionBar = ({onClose=function(){}, onSubmit=function(){}}) => {

    return(
        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
            <IconButton icon={"close"} onPress={() => onClose()}/>
            <IconButton icon={"check"} onPress={() => onSubmit()}/>
        </View>
    )
}

export default ActionBar;