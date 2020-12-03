import React from 'react';
import {View} from 'react-native';
import {Button, IconButton, withTheme} from 'react-native-paper';

const ActionBar = ({onClose=function(){}, onSubmit=function(){},saveDisabled=false,exitDisabled=false, ...props}) => {

    return(
        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <IconButton icon={"close"} onPress={() => onClose()} disabled={exitDisabled} />
            </View>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", margin: 5, alignItems: 'center'}}>
                <Button onPress={() => onSubmit()} color={props.theme.colors.text} labelStyle={{fontSize: 16}} disabled={saveDisabled}> Save </Button>
            </View>
        </View>
    )
}

export default withTheme(ActionBar);