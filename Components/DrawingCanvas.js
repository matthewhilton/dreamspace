import React, { Component } from 'react';
import { View } from 'react-native';
import ExpoPixi from 'expo-pixi';
import {withTheme} from "react-native-paper";

// This must be kept as a Classful component rather than functional,
// as it is required for the ExpoPixi component
class DrawingCanvas extends Component {
    render() {
        const color = 0xff0000;
        const width = 15;
        const alpha = 1;

        const themeColors = this.props.theme.colors;

        return (
            <View style={{flex: 1, backgroundColor: themeColors.background_sheet}}>
                <ExpoPixi.Sketch
                    strokeColor={color}
                    strokeWidth={width}
                    strokeAlpha={alpha}
                    style={{ flex: 1 }}
                />
            </View>
        );
    }
}

export default withTheme(DrawingCanvas)