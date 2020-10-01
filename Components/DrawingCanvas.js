import React, { useState } from 'react';
import { View, Image } from 'react-native';
import ExpoPixi from 'expo-pixi';
import {Button, withTheme, IconButton} from "react-native-paper";
import {LightenDarkenColor} from "lighten-darken-color";
import { takeSnapshotAsync } from 'expo';
import SketchToolbar from "./SketchToolbar";
import SketchActionBar from "./SketchActionBar";


const DrawingCanvas = (props) => {
    const themeColors = props.theme.colors;
    const canvasRef = React.useRef(null);
    const [image, setImage] = useState(null)
    const [penColor, setPenColor] = useState("0xffffff")

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

            <SketchActionBar
                onClose={() => console.log("closing drawing")}
                onSubmit={() => snapshot()}
            />
            <ExpoPixi.Sketch
                onChange={() => console.log("Image changed")}
                ref={canvasRef}
                strokeColor={penColor}
                strokeWidth={15}
                strokeAlpha={1}
                style={{ flex: 1, minHeight: 300}}
            />
            <SketchToolbar onColorChange={(color) => setPenColor(color.replace("#", "0x"))} onUndo={() => canvasRef.current.undo()}/>
        </View>
    );
}

export default withTheme(DrawingCanvas)