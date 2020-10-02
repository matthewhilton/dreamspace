import React, { useState } from 'react';
import { View } from 'react-native';
import ExpoPixi from 'expo-pixi';
import { withTheme} from "react-native-paper";
import {LightenDarkenColor} from "lighten-darken-color";
import SketchToolbar from "./SketchToolbar";
import ActionBar from "../ActionBar";

const DrawingCanvas = (props) => {
    const themeColors = props.theme.colors;
    const canvasRef = React.useRef(null);
    const [penColor, setPenColor] = useState("#ffffff")

    function snapshot() {
        canvasRef.current.takeSnapshotAsync({format: 'png'}).then((data) => {
            props.onSubmit(data)
        })
    }

    return (
        <View style={{
            flex: 1,
            borderRadius: 5,
            backgroundColor: LightenDarkenColor(themeColors.background_sheet, 10)}}>

            <ActionBar
                onClose={() => props.onClose()}
                onSubmit={() => snapshot()}
            />
            <ExpoPixi.Sketch
                onChange={() => console.log("Image changed")}
                ref={canvasRef}
                strokeColor={penColor.replace("#", "0x")}
                strokeWidth={15}
                strokeAlpha={1}
                style={{ flex: 1, minHeight: 300}}
            />
            <SketchToolbar
                onColorChange={(color) => {
                    setPenColor(color)
                }}
                selectedColor={penColor}
                onUndo={() => canvasRef.current.undo()}/>
        </View>
    );
}

export default withTheme(DrawingCanvas)