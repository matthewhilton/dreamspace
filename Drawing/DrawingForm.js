import React, { useState, useEffect } from 'react';
import DrawingCanvas from "./DrawingCanvas";
import {Button, withTheme} from "react-native-paper";
import {View} from "react-native";
import DrawingPreview from "./DrawingPreview";
import HorizontalGallery from "../Components/HorizontalGallery";
import {useActionSheet} from "@expo/react-native-action-sheet";

const DrawingForm = (props) => {
    const [drawingOpen, setDrawingOpen] = useState(false)
    const { showActionSheetWithOptions } = useActionSheet();

    // Update the state of the form so parent ScrollView can be disabled if open
    useEffect(() => {
        props.onOpenChange(drawingOpen)
    }, [drawingOpen])

    return(
        <>
            <View style={{flex: 1, marginTop: 5, }}>

                {drawingOpen ? <DrawingCanvas
                    onClose={() => {
                        setDrawingOpen(false)}
                    }
                    onSubmit={(data) => {
                        props.onChange([...props.value, data])
                        setDrawingOpen(false)
                    }}/> : <Button 
                                    icon="plus" 
                                    onPress={() => setDrawingOpen(true)} 
                                    mode="outlined"
                                    style={{padding: 5}}
                                    > 
                                    Drawing 
                                </Button>}
                    
                    <HorizontalGallery>
                        {
                            props.value.map((data, index) => (
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
                                                    props.onChange(newArray);
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

export default withTheme(DrawingForm);