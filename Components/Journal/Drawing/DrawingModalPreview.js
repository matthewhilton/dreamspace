import React from 'react'
import {Dimensions, View} from 'react-native'
import {withTheme} from 'react-native-paper';
import Image from 'react-native-scalable-image';

const DrawingModelPreview = ({navigation,route,theme, ...props}) => {
    const drawingData = route.params.data;

    return (
        <View style={{backgroundColor: theme.colors.mainScreenBackground, height: "100%", justifyContent: "center", alignItems: "center"}}>
            <View style={{
                backgroundColor: theme.colors.journalFormBackground, 
                margin: 20, 
                padding: 10, 
                borderRadius: 10}}
                >
                <Image source={{uri: drawingData.uri}} width={Dimensions.get("screen").width - 40} />
            </View>
        </View>
    )
}

export default withTheme(DrawingModelPreview)

