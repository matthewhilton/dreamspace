import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, LayoutAnimation} from 'react-native';
import { Paragraph, Title, Text, withTheme, Subheading} from "react-native-paper";

import { useSelector } from "react-redux";
import getJournalAverages from "../Functions/getJournalAverages";
import DreamStatisticPoint from "./DreamStatisticPoint";
import HorizontalGallery from "./HorizontalGallery";
import DrawingPreview from "../Drawing/DrawingPreview";
import DrawingModalPreview from "../Drawing/DrawingModalPreview";
import { createStackNavigator } from '@react-navigation/stack';
import RecordingPreview from './VoiceRecording/RecordingPreview';
import HorizontalRule from './HorizontalRule';
import TagView from './TagPicker/TagView';
import Delayed from './Delayed';


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

    const styles = StyleSheet.create({
        containerCard: {
            backgroundColor: theme.colors.journalViewCard, 
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
        }
    })

    const delayedAnimation = LayoutAnimation.create(200, LayoutAnimation.Types.easeIn, LayoutAnimation.Properties.opacity);
    
    return (
        <ScrollView style={{margin: 15}} showsVerticalScrollIndicator={false}>
                <View style={styles.containerCard}>
                    <Text style={{fontWeight: "bold", fontSize: 40}} numberOfLines={5}>{data.title || "untitled"}</Text>
                    <Text style={{color: theme.colors.subtext, fontSize: 15, fontWeight: "bold"}}>{new Date(data.date).toLocaleDateString()} ({Math.round(Math.abs((new Date() - new Date(data.date)) / oneDay))} DAYS AGO)</Text>
                </View>

                {data.tags.length > 0 ? 
               
                <View style={styles.containerCard}>
                    <Subheading style={{fontWeight: 'bold'}}>Tags</Subheading>
                    <TagView showIcon={false} tags={data.tags.map((tag) => {tag.selected = true; return tag;})}/>
                </View>
            
                : null}
                
                <Delayed delay={100} animation={delayedAnimation}>
                    <View style={styles.containerCard}> 
                        <Subheading style={{fontWeight: 'bold'}}>Ratings</Subheading>
                        <View style={{flexDirection: "row"}}>
                            <DreamStatisticPoint icon="brain" value={data.memory} average={averages.memory} />
                            <DreamStatisticPoint icon="eye" value={data.lucidity} average={averages.lucidity}/>
                            <DreamStatisticPoint icon="sun" value={data.vividness} average={averages.vividness}/>
                        </View>
                    </View>
                </Delayed>
                
                <Delayed delay={200} animation={delayedAnimation}>
                    <View style={[styles.containerCard, {flexDirection: 'column'}]}> 
                        <Subheading style={{fontWeight: 'bold'}}>Description</Subheading>
                        {data.description == "" ? 
                        <Text style={{color: theme.colors.subtext}}>No description</Text> :  
                        <Paragraph>{data.description}</Paragraph>}
                    </View>
                </Delayed>
                
                <Delayed delay={200} animation={delayedAnimation}>
                    <View style={styles.containerCard}>
                        <Subheading style={{fontWeight: 'bold'}}>Drawings</Subheading>
                        {data.drawings.length == 0 ? 
                        <Text>No Drawings</Text> : 
                            <HorizontalGallery
                            autoScrollToEnd={false}>
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
                </Delayed>

                <Delayed delay={200} animation={delayedAnimation}>
                    <View style={styles.containerCard}>
                        <Subheading style={{fontWeight: 'bold'}}>Recordings</Subheading>
                        {data.audioRecordings.length == 0 ? 
                        <Text>No Recordings</Text> : 
                            <HorizontalGallery
                            autoScrollToEnd={false}>
                            {data.audioRecordings.map((recording, index) => (
                                <RecordingPreview 
                                data={recording} 
                                key={recording.uri}
                                />
                            ))}
                            </HorizontalGallery>}
                    </View>
                </Delayed>
            </ScrollView>
    )
}

export default withTheme(JournalEntryView)
