import React from 'react'
import { View, ScrollView } from 'react-native'
import { Title, Text, Searchbar } from 'react-native-paper';
import DrawingPreview from './Drawing/DrawingPreview';
import HorizontalGallery from './HorizontalGallery';
import HorizontalRule from './HorizontalRule';
import TagView from './TagPicker/TagView';
import RecordingPreview from './VoiceRecording/RecordingPreview';

export const FormResultsPreview = ({formData={}}) => {
    
    return(
        <ScrollView alwaysBounceVertical={false}>
            <Title style={{fontWeight: "bold"}}> Confirm Journal Entry </Title>
                <HorizontalRule /> 
                <Seperator> 
                    <Text style={{fontWeight: "bold"}}> Title </Text>
                    <Text> {formData.title || "None"} </Text>
                </Seperator>

                <Seperator> 
                    <Text style={{fontWeight: "bold"}}> Date </Text>
                    <Text> {new Date(formData.date).toDateString() || "None"} </Text>
                </Seperator>

                <Seperator>
                    <Text style={{fontWeight: "bold"}}> Description </Text>
                    <Text> {formData.description || "None"} </Text>
                </Seperator>

                <View style={{flexDirection: "row"}}>
                <Seperator>
                    <Text style={{fontWeight: "bold"}}> Drawings </Text>
                    <View>
                        <HorizontalGallery>
                            {
                                formData.drawings.map((data) => (
                                    <DrawingPreview
                                        key={data.uri}
                                        uri={data.uri}
                                    />
                                ))
                            }
                        </HorizontalGallery> 
                    </View>
                    {formData.drawings.length == 0 ? <Text> None </Text> : null }
                </Seperator>
                
                <Seperator>
                    
                        <Text style={{fontWeight: "bold"}}> Recordings </Text>
                        <View>
                            <HorizontalGallery>
                                {formData.audioRecordings.map((data, index) => (
                                    <RecordingPreview
                                        key={data.uri || null}
                                        data={data}
                                    />
                                ))}
                            </HorizontalGallery>
                        
                        {formData.audioRecordings.length == 0 ? <Text> None </Text> : null }

                        
                    </View>
                </Seperator>

                </View>
                
                <Seperator>
                    <Text style={{fontWeight: "bold"}}> Vividness: {formData.vividness} </Text>
                    <Text style={{fontWeight: "bold"}}> Memory: {formData.memory} </Text>
                    <Text style={{fontWeight: "bold"}}> Lucidity: {formData.lucidity} </Text>
                </Seperator>

                <Seperator>
                    <Text style={{fontWeight: "bold"}}> Tags </Text>
                    {formData.tags.length == 0 ? <Text> None </Text> : null }
                    <TagView tags={formData.tags} />
                </Seperator>
        </ScrollView>
    )
}

const Seperator = props => (
    <View style={{marginTop: 10, flex: 1}}>
        {props.children}
    </View>
)
