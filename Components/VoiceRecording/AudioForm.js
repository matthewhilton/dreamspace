import React, {useEffect, useState} from "react";
import { View } from "react-native";
import {Button} from "react-native-paper";
import AudioRecordingInput from "./AudioRecordingInput";
import HorizontalGallery from "../HorizontalGallery";
import RecordingPreview from "./RecordingPreview";
import {useActionSheet} from "@expo/react-native-action-sheet";

const AudioForm = (props) => {
    const [open, setOpen] = useState(false)
    const [recordings, setRecordings] = useState([])
    const { showActionSheetWithOptions } = useActionSheet();

    // Update parent controller whenever drawings changes
    useEffect(() => {
        props.onChange(recordings)
    }, [JSON.stringify(recordings)])


    return(
        <>

            <View style={{flex: 1, marginTop: 5, }}>
                {open ?   <AudioRecordingInput
                    onPermissionDenied={() => setOpen(false)}
                    onClose={() => setOpen(false)}
                    onChange={(data) => {
                        setRecordings([...recordings, data])
                        setOpen(false)
                    }}
                />

            :
            <Button icon={"microphone-plus"} mode={"outlined"} onPress={() => setOpen(true)}> Add Recording </Button>
            }

            <HorizontalGallery>
                {recordings.map((data, index) => (
                    <RecordingPreview
                        key={data.uri || null}
                        data={data}
                        onLongPress={() => {
                            showActionSheetWithOptions({
                                    options: ["Cancel", "Delete"],
                                    destructiveButtonIndex: 1,
                                    cancelButtonIndex: 0,
                                },
                                (buttonIndex) => {
                                    if(buttonIndex == 1){
                                        // Button index 1 is delete button, so delete this image
                                        let newArray = [...recordings];
                                        newArray.splice(index, 1);
                                        setRecordings(newArray);
                                    }
                                })
                        }}
                    />
                ))}
            </HorizontalGallery>
            </View>
        </>
    )
}

export default AudioForm;