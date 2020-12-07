import React from "react";
import {TouchableOpacity, View} from "react-native";
import {Text, withTheme} from "react-native-paper";

import dayNames, {nth} from '../../../Functions/dayNames'

var Color = require('color');

const JournalLibaryEntry = ({data, theme, onPress}) => {
    const entryDate = new Date(data.date)
    const dateString = dayNames[entryDate.getDay()] + " " + entryDate.getDate()
    return(
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View style={{
                flexDirection: "row", 
                alignItems: "flex-start", 
                justifyContent:"space-between", 
                padding: 18, 
                borderRadius: 5,
                marginVertical: 5,
                flex: 1,
                backgroundColor:  Color(theme.colors.journalViewCard).darken(0.1).hex()
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
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: 15, color: theme.colors.subtext}}> 
                        {dateString} 
                    </Text>
                    <Text style={{fontSize:12, color: theme.colors.subtext}}> 
                        {nth(entryDate.getDate())} 
                    </Text> 
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default withTheme(JournalLibaryEntry);