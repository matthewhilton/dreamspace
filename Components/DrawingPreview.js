import React from 'react'
import { View,Dimensions } from 'react-native'
import {withTheme} from "react-native-paper";
import Image from 'react-native-scalable-image';

const DrawingPreview = (props) =>(
    <View style={{
        flex: 1,
        borderColor: props.theme.colors.placeholder,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Image source={{uri: props.uri}} width={Dimensions.get('window').width * 0.75}/>
    </View>
)

export default withTheme(DrawingPreview);