import React, { useState } from 'react';
import { View, Dimensions} from 'react-native';
import ExpoPixi from 'expo-pixi';
import { withTheme} from "react-native-paper";
import {LightenDarkenColor} from "lighten-darken-color";
import SketchToolbar from "./SketchToolbar";
import ActionBar from "../ActionBar";
import AlertAsync from "react-native-alert-async";

const DrawingCanvas = (props) => {
    const themeColors = props.theme.colors;
    const canvasRef = React.useRef(null);
    const [penColor, setPenColor] = useState("#ffffff")
    const [hasDrawingBegun, setHasDrawingBegun] = useState(false)

    function snapshot() {
        canvasRef.current.takeSnapshotAsync({format: 'png'}).then((data) => {
            props.onSubmit(data)
        })
    }

    async function shouldClose() {
        if (hasDrawingBegun) {
            const choice = await AlertAsync(
                "Discard Drawing?",
                "A drawing has been started. Exiting will discard the current drawing.",
                [
                    {text: 'Discard', onPress: () => 'yes', style: 'destructive'},
                    {text: 'Cancel', onPress: () => 'no', style: 'cancel'},
                ],
            );

            if (choice == 'no') {
                return;
            }
        }

        props.onClose();
    }

    return (
        <View style={{
            flex: 1,
            borderRadius: 5,
            backgroundColor: LightenDarkenColor(themeColors.background_sheet, 10)}}>
            <ActionBar
                onClose={() => shouldClose()}
                onSubmit={() => snapshot()}
                saveDisabled={!hasDrawingBegun}
            />
            <ExpoPixi.Sketch
                onChange={() => setHasDrawingBegun(true)}
                ref={canvasRef}
                strokeColor={penColor.replace("#", "0x")}
                strokeWidth={15}
                strokeAlpha={1}
                style={{ flex: 1, minHeight: Dimensions.get('screen').height * 0.5}}
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