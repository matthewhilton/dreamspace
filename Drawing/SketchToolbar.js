import React from 'react';
import { View } from 'react-native';
import {IconButton, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SketchToolbar = (props) => {
    const icon = "brush"
    const presetColors = ["#eb4034", "#ffc130","#71f246", "#30e7ff", "#4a7cf0","#a230ff","#ffffff"]

    return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', padding: 5}}>
            <IconButton onPress={() => props.onUndo()} icon={() => <Icon name={"undo"} color={props.theme.colors.text} />} />
            {presetColors.map((color) => (
                <IconButton style={{backgroundColor: props.selectedColor == color ? props.theme.colors.journalFormBackground : null}} key={color} icon={icon} color={color} onPress={() => props.onColorChange(color)}/>
            ))}
        </View>
    )
}

export default withTheme(SketchToolbar)