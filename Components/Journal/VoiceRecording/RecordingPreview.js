import React, {useState} from "react";
import {Text, withTheme} from "react-native-paper";
import {TouchableOpacity, View} from "react-native";
import {Audio} from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RecordingPreview = (props) => {
    const [isPreviewing, setIsPreviewing] = useState(false)
    const [sound, setSound] = useState(new Audio.Sound())

    Audio.setAudioModeAsync({
        allowsRecordingIOS: false
    })

    async function toggleAudioPreview() {
        if (!isPreviewing) {
            // Start the preview
            try {
                await sound.loadAsync({uri: props.data.uri})
                await sound.playAsync();
                setIsPreviewing(true)

                sound.setOnPlaybackStatusUpdate((status) => {
                    if(status.didJustFinish){
                        stopPreview()
                    }
                })
            } catch (error) {
                console.error(error)
            }
        } else {
            // Stop the preview
            await stopPreview()
        }
    }

    async function stopPreview(){
        await sound.unloadAsync();
        setIsPreviewing(false)
        setSound(new Audio.Sound())
    }

    return(
        <View
            style={{
                borderColor: props.theme.colors.placeholder,
                borderWidth: 1,
                borderRadius: 5,
                margin: 5,
                marginLeft: 0,
                alignItems: 'center',

            }}>
            <TouchableOpacity
                onPress={() => toggleAudioPreview()}
                onLongPress={() => {
                    if(!isPreviewing){
                        props.onLongPress()
                    }
                }}
            >
                <View
                style={{
                    padding: 15,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    {isPreviewing == false ? <Icon name={"file-audio"} size={30} color={props.theme.colors.text}/>
                                            : <Icon name={"stop"} size={30} color={props.theme.colors.text}/>
                    }
                        <View>
                            <Text style={{fontSize: 20, padding: 0, margin: 0, alignSelf: 'center', textAlign: 'center' }}>
                                {Math.round(props.data.length / 1000)}s
                            </Text>
                        </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(RecordingPreview);