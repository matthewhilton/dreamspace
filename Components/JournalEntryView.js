import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, LayoutAnimation} from 'react-native';
import { Paragraph, Title, Text, withTheme, Subheading, Button, IconButton} from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
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
import AlertAsync from 'react-native-alert-async';


const JournalEntryView = ({route, navigation, theme}) => {
    const entryUUID = route.params.data.uuid;
    const journalSelector = useSelector(state => state.journal)
    const data = useSelector(state => state.journal.find((item) => item.uuid == entryUUID));
    const dispatch = useDispatch();
    const [averages, setAverages] = useState({})

    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerRight: () => (
                <View style={{flexDirection: "row"}}>
                    <IconButton icon="pencil" onPress={editEntry} />
                    <IconButton icon="delete" onPress={deleteEntry} />
                    <IconButton icon="export-variant" />
                </View>
            )
        })

        // Run functions to get statistics whenever the data changes
        setAverages(getJournalAverages(journalSelector))
        // TODO some more functions, e.g. maybe a ML model to find trends?
    }, [data])

    const deleteEntry = async () => {
        // Double check the user wants to delete
        const choice = await AlertAsync(
            "Delete Journal Entry",
            "Are you sure you want to delete this journal entry?",
            [
                {text: 'Delete', onPress: () => 'delete', style: 'destructive'},
                {text: 'Cancel', onPress: () => 'dont', style: 'cancel'},
            ],
        )
        if(choice == "dont"){
            return;
        }

        // Run the deletion function
        navigation.navigate("JournalLibrary");

        dispatch({
            object: "JOURNAL", 
            type: "DELETE", 
            data: data.uuid,
        })
    }

    const editEntry = () => {
        navigation.navigate("JournalEditor", { data: data })
    }

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
    
    if(data == undefined) return(null);
    
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
