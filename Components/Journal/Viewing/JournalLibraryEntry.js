import React from "react";
import {TouchableOpacity, View} from "react-native";
import {Text, withTheme} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';

var Color = require('color');

const JournalLibaryEntry = ({data, theme, onPress}) => {
    const dateString = new Date(data.date).toLocaleDateString()
    return(
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View style={{
                flexDirection: "row", 
                alignItems: "flex-start", 
                justifyContent:"space-between", 
                padding: 13, 
                borderRadius: 5,
                marginVertical: 8,
                flex: 1,
            }}
                >
                <View style={{flexDirection: "row", alignItems: "center", flex: 1, flexWrap: "false"}}>
                    <Text style={{
                        fontWeight: "bold", 
                        fontStyle: data.title ? null : "italic",
                        fontSize: 18
                        }}
                        numberOfLines={1}
                        > 
                        {data.title || "untitled"}
                    </Text>
                </View>

                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
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
        </TouchableOpacity>
    )
}

export default withTheme(JournalLibaryEntry);