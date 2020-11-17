import React from "react";
import { View,TouchableWithoutFeedback } from "react-native";
import { withTheme, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
var Color = require('color');

const JournalLibaryEntry = ({data, theme, onPress}) => {
    const dateString = new Date(data.date).toLocaleDateString()
    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent:"space-between", 
                padding: 13, 
                backgroundColor: Color(theme.colors.journalFormBackground).darken(0.05).hex(),
                borderRadius: 5,
                marginBottom: 5,
                flex: 1
            }}
                >
                <View style={{flexDirection: "row", alignItems: "center", flex: 1}}>
                    <Text style={{fontWeight: data.title ? "bold" : null, fontStyle: data.title ? null : "italic"}}> {data.title || "untitled"}</Text> 
                    {data.drawings.length > 0 ? 
                        <Icon 
                            name={"file-image"} 
                            color={theme.colors.placeholder} 
                            style={{marginLeft: 10}}
                            size={17}
                            />: null
                    }
                    {data.audioRecordings.length > 0 ? 
                        <Icon 
                            name={"file-audio"} 
                            color={theme.colors.placeholder} 
                            style={{marginLeft: 10}}
                            size={17}
                            />: null
                    } 
                    {data.description !== "" ? 
                        <Icon 
                            name={"file-alt"} 
                            color={theme.colors.placeholder} 
                            style={{marginLeft: 10}}
                            size={17}
                            />: null
                    } 
                </View>
                <Text style={{fontSize: 15}}> {dateString} </Text>

                
            </View>
        </TouchableWithoutFeedback>
    )
}

export default withTheme(JournalLibaryEntry);