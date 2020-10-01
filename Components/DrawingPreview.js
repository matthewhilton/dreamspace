import React from 'react'
import { View,Dimensions } from 'react-native'
import {IconButton, withTheme} from "react-native-paper";
import Image from 'react-native-scalable-image';

const DrawingPreview = (props) =>(
    <View style={{
        flex: 1,
        borderColor: props.theme.colors.placeholder,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        marginLeft: 0,
        alignItems: 'center'
    }}>
        <IconButton
            icon={"delete"}
            style={{position: 'absolute', left: 2, top: 2}}

            color={props.theme.colors.placeholder}
            onPress={() => console.log("hello")}
        />
        <Image source={{uri: props.uri}} width={Dimensions.get('window').width * 0.75}/>
    </View>
)

export default withTheme(DrawingPreview);