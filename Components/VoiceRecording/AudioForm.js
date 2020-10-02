import React, {useEffect, useState} from "react";
import { View } from "react-native";
import {Button} from "react-native-paper";
import AudioRecordingInput from "./AudioRecordingInput";

const AudioForm = (props) => {
    const [open, setOpen] = useState(false)
    const [recordings, setRecordings] = useState([])

    // Update parent controller whenever drawings changes
    useEffect(() => {
        props.onChange(recordings)
    }, [JSON.stringify(recordings)])


    return(
        <>
            {open ?
            <View>
                <AudioRecordingInput
                    onPermissionDenied={() => setOpen(false)}
                    onClose={() => setOpen(false)}
                    onChange={(data) => {
                        setRecordings([...recordings, data])
                        setOpen(false)
                    }}
                />
            </View>
            :
            <Button icon={"microphone-plus"} mode={"outlined"} onPress={() => setOpen(true)}> Add Recording </Button>
            }
        </>
    )
}

export default AudioForm;