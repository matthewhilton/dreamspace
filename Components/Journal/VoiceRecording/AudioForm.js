import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Button} from "react-native-paper";
import AudioRecordingInput from "./AudioRecordingInput";
import HorizontalGallery from "../../Containers/HorizontalGallery";
import RecordingPreview from "./RecordingPreview";
import {useActionSheet} from "@expo/react-native-action-sheet";

const AudioForm = (props) => {
    const [open, setOpen] = useState(false)
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        props.onOpenChange(open)
    }, [open])

    return(
        <>

            <View style={{flex: 1, marginTop: 5, }}>
                {open ?   <AudioRecordingInput
                    onPermissionDenied={() => setOpen(false)}
                    onClose={() => setOpen(false)}
                    onChange={(data) => {
                        props.onChange([...props.value, data])
                        setOpen(false)
                    }}
                />

            :
            <Button icon={"plus"} mode={"outlined"} onPress={() => setOpen(true)} style={{padding: 5}}> Recording </Button>
            }

            <HorizontalGallery>
                {props.value.map((data, index) => (
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
                                        let newArray = [...props.value];
                                        newArray.splice(index, 1);
                                        props.onChange(newArray);
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