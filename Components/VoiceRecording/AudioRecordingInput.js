import React, {useState, useEffect} from "react"
import { View, Alert } from "react-native";
import { Audio } from 'expo-av';
import {Button, Text, withTheme} from "react-native-paper"
import {LightenDarkenColor} from "lighten-darken-color";
import ActionBar from "../ActionBar";
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertAsync from "react-native-alert-async";

const AudioRecordingInput = (props) => {
    const [permissions, setPermissions] = useState({})
    const [isRecording, setIsRecording] = useState(false)
    const [recordingStatus, setRecordingStatus] = useState({})
    const [recording, setRecording] = useState(new Audio.Recording())

    const [recordingData, setRecordingData] = useState(null)

    // On mount check permissions level
    useEffect(() => {
        let isMounted = true;
        Audio.getPermissionsAsync().then((result) => {
            if(isMounted) setPermissions(result)
        })

        // Hook clean up function
        return () => (isMounted = false);
    }, [])

    // On permissions change, check if not granted, and see if can ask
    useEffect(() => {
        let isMounted = true;
        if(!permissions.granted){
            Audio.requestPermissionsAsync().then((result) => {
                // Ensure promise ignores state if already unmounted
                if(isMounted) setPermissions(result)
            })
        }

        // Show alert message if the permission changes is denied
        if(permissions.status == "denied"){
            if(isMounted) Alert.alert("Permission Error", "The dreamspace app has not been given permission to record audio. If you wish to record audio, you must allow microphone access in your phones Settings.")
            props.onPermissionDenied();
        }

        // Return cleanup function (will cancel state updates when run)
        return () => (isMounted = false)
    }, [JSON.stringify(permissions)])


    async function toggleRecording() {
        if (!isRecording) {
            // Check if user is ok with overriding current recording
            if(recordingData != null){
                console.log("recording already exists")
                const choice = await AlertAsync(
                    "Override Recording?",
                    "A recording exists but it has not been saved yet. Starting a new recording will override the current one.",
                    [
                        { text: 'Override', onPress: () => 'yes', style: 'destructive'},
                        { text: 'Cancel', onPress: () => 'no', style: 'cancel'},
                    ],
                );

                if(choice == 'no'){
                    return;
                }
                // Else continue and override recording
            }

            // Start recording
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                })
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setIsRecording(true)

                recording.setProgressUpdateInterval(500)
                recording.setOnRecordingStatusUpdate((status) => setRecordingStatus(status));

            } catch (error) {
                console.error("Recording error: ", error)
                setIsRecording(false)
            }
        } else {
            // Stop recording
            await recording.stopAndUnloadAsync();

            // Record the data
            setRecordingData({
                length: recordingStatus.durationMillis,
                uri: recording.getURI()
            })

            // Reset the recording object for another use
            setRecording(new Audio.Recording())
            setIsRecording(false)
        }
    }

    function submitRecording() {
        // Emit the new audio
        props.onChange(recordingData)
    }


    if(permissions.status == "denied"){
        return(null);
    } else {
        return(
            <View style={{
                flex: 1,
                borderRadius: 5,
                backgroundColor: LightenDarkenColor(props.theme.colors.background_sheet, 10)}}>
                <ActionBar onClose={() => props.onClose()} onSubmit={() => submitRecording()}/>
                <View style={{alignSelf: 'center', alignContent: "center", flex: 1}}>
                    <RecordingButton color={props.theme.colors.recordingButton} onPress={() => toggleRecording()} recording={isRecording}/>
                    {recordingStatus.durationMillis ? <Text style={{fontSize: 50, alignSelf: "center"}}> {Math.round(recordingStatus.durationMillis / 1000) + "s"} </Text> : null }

                </View>
            </View>
        )
    }
}

const RecordingButton = ({recording = false, size=100, color="red", onPress=function(){}}) => {
    if(recording){
        return( <Button compact onPress={() => onPress()} icon={() => <Icon name={"square"} size={size} color={color}/> }  /> )
    } else {
        return( <Button compact onPress={() => onPress()} icon={() => <Icon name={"circle"} size={size} color={color}/> }  /> )
    }
}

export default withTheme(AudioRecordingInput);