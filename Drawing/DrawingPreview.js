import React from 'react'
import { View,Dimensions, TouchableOpacity } from 'react-native'
import { withTheme} from "react-native-paper";
import Image from 'react-native-scalable-image';

const DrawingPreview = ({uri=null, onLongPress=function(){}, onPress=function(){}, ...props}) =>(
    <View style={{
        borderColor: props.theme.colors.placeholder,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
        alignItems: 'center', 
        padding: 5
    }}>
      <TouchableOpacity onLongPress={() => onLongPress()} onPress={() => onPress()}>
        <Image source={{uri: uri}} width={Dimensions.get('window').width * 0.30} />
      </TouchableOpacity>
    </View>
)

export default withTheme(DrawingPreview);