import React, {useEffect} from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from "react-native-paper"
import * as Haptics from "expo-haptics"

const FormSuccessIndicator = (props) => {

    useEffect(() => {
        Haptics.notificationAsync("success")

        setTimeout(() => {
            props.onFinish()
        }, 2000)
    }, [])

    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;

    const height = screenHeight / 3;
    const width = screenWidth / 2;

    return(
        <View style={{
            position: "absolute", 
            left: (screenWidth/2-(width/2)), 
            top: (screenHeight/2-(height/2)), 
            backgroundColor: "red",
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center"
            }}>
            <Text>
                Success!
            </Text>
        </View>
    )
}

export default FormSuccessIndicator;
