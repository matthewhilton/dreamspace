import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

const SketchToolbar = (props) => {
    const icon = "brush"
    const presetColors = ["#eb4034", "#ffc130","#71f246", "#30e7ff", "#4a7cf0","#a230ff","#ffffff"]

    return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', padding: 5}}>
            <IconButton onPress={() => props.onUndo()} icon={"undo"} />
            {presetColors.map((color) => (
                <IconButton key={color} icon={icon} color={color} onPress={() => props.onColorChange(color)}/>
            ))}
        </View>
    )
}

export default SketchToolbar