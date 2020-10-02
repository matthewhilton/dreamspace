import React from 'react'
import { View,Dimensions, TouchableOpacity } from 'react-native'
import { withTheme} from "react-native-paper";
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
      <TouchableOpacity onLongPress={() => props.onLongPress()}>
        <Image source={{uri: props.uri}} width={Dimensions.get('window').width * 0.30}/>
      </TouchableOpacity>
    </View>
)

export default withTheme(DrawingPreview);