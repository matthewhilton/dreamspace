import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Text, withTheme} from "react-native-paper";

import { useSelector } from "react-redux";
import getJournalAverages from "../Functions/getJournalAverages";
import DreamStatisticPoint from "./DreamStatisticPoint";
import HorizontalGallery from "./HorizontalGallery";
import DrawingPreview from "../Drawing/DrawingPreview";
import DrawingModalPreview from "../Drawing/DrawingModalPreview";
import { createStackNavigator } from '@react-navigation/stack';
import RecordingPreview from './VoiceRecording/RecordingPreview';

const JournalEntryView = ({route, navigation, theme}) => {
    const data = route.params.data;
    const journalSelector = useSelector(state => state.journal)
    const [averages, setAverages] = useState({})

    const [previewItem, setPreviewItem] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            title: ""
        })

        // Run functions to get statistics whenever the data changes
        setAverages(getJournalAverages(journalSelector))
        // TODO some more functions, e.g. maybe a ML model to find trends?
    }, [data])

    const oneDay = 24 * 60 * 60 * 1000;

    return (
        <View style={{margin: 10}}>
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 40}}> {data.title || "untitled"} </Text>
                    <Text style={{color: theme.colors.subtext, fontSize: 15, fontWeight: "bold", marginLeft: 10}}>{new Date(data.date).toLocaleDateString()} ({Math.round(Math.abs((new Date() - new Date(data.date)) / oneDay))} DAYS AGO)</Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: 10}}> 
                    <DreamStatisticPoint icon="brain" value={data.memory} average={averages.memory} />
                    <DreamStatisticPoint icon="eye" value={data.lucidity} average={averages.lucidity}/>
                    <DreamStatisticPoint icon="sun" value={data.vividness} average={averages.vividness}/>
                </View>

                <View style={{flexDirection: 'column', marginHorizontal: 10}}> 
                    <Text style={{fontWeight: 'bold'}}> Description </Text>
                    {data.description == "" ? 
                    <Text style={{color: theme.colors.subtext}}> No description </Text> :  
                    <Paragraph>
                        {data.description}
                    </Paragraph>}
                </View>

                <View style={{marginHorizontal: 10}}>
                    <Text style={{fontWeight: 'bold'}}> Drawings </Text>
                    {data.drawings.length == 0 ? 
                    <Text> No Drawings </Text> : 
                        <HorizontalGallery>
                        {data.drawings.map((drawing, index) => (
                            <DrawingPreview 
                            uri={drawing.uri} 
                            key={drawing.uri} 
                            onPress={() => {
                                navigation.navigate("JournalImageView", { data: drawing});
                            }} 
                            />
                        ))}
                        </HorizontalGallery>}
                </View>

                <View style={{marginHorizontal: 10}}>
                <Text style={{fontWeight: 'bold'}}> Recording </Text>
                {data.audioRecordings.length == 0 ? 
                    <Text> No Recordings </Text> : 
                        <HorizontalGallery>
                        {data.audioRecordings.map((recording, index) => (
                            <RecordingPreview 
                            data={recording} 
                            key={recording.uri}
                            />
                        ))}
                        </HorizontalGallery>}
                </View>
            </View>
    )
}

export default withTheme(JournalEntryView)
