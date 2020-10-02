import React, { useState, useEffect } from 'react';
import DrawingCanvas from "./DrawingCanvas";
import {Button} from "react-native-paper";
import {View} from "react-native";
import DrawingPreview from "./DrawingPreview";
import HorizontalGallery from "../HorizontalGallery";
import {useActionSheet} from "@expo/react-native-action-sheet";

const DrawingForm = (props) => {
    const [drawingOpen, setDrawingOpen] = useState(false)
    const [drawings, setDrawings] = useState([])
    const { showActionSheetWithOptions } = useActionSheet();

    // Update the state of the form so parent ScrollView can be disabled if open
    useEffect(() => {
        props.onOpenChange(drawingOpen)
    }, [drawingOpen])

    // Update parent controller whenever drawings changes
    useEffect(() => {
        props.onChange(drawings)
    }, [JSON.stringify(drawings)])

    return(
        <>
            <View style={{flex: 1}}>

                {drawingOpen ? <DrawingCanvas
                    onClose={() => {
                        setDrawingOpen(false)}
                    }
                    onSubmit={(data) => {
                        setDrawings([...drawings, data])
                        setDrawingOpen(false)
                    }}/> : <Button icon="plus" mode={"outlined"} onPress={() => setDrawingOpen(true)}> Add Drawing </Button>}

                <HorizontalGallery>
                    {

                        drawings.map((data, index) => (

                            <DrawingPreview
                                key={data.uri}
                                uri={data.uri}
                                onLongPress={() => {
                                    showActionSheetWithOptions({
                                            options: ["Cancel", "Delete"],
                                            destructiveButtonIndex: 1,
                                            cancelButtonIndex: 0,
                                        },
                                        (buttonIndex) => {
                                            if(buttonIndex == 1){
                                                // Button index 1 is delete button, so delete this image
                                                let newArray = [...drawings];
                                                newArray.splice(index, 1);
                                                setDrawings(newArray);
                                            }
                                        })
                                }}
                            />

                        ))
                    }
                </HorizontalGallery>
            </View>
        </>
    )
}

export default DrawingForm;