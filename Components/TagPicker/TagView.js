import React from "react"
import { View, ScrollView, Dimensions } from "react-native";
import {ActivityIndicator, Chip, Text, Title, withTheme} from "react-native-paper";
import {LightenDarkenColor} from "lighten-darken-color";
import * as Haptics from 'expo-haptics';

var Color = require('color');

const TagView = ({tags=[], emptyContent=<Text />,loading=false,onPressed=function(){}, onLongPressed=function(){},filter=null,antiFilter=null, persistentTag=<Text />,showIcon=true,...props}) => {

    const filteredTags = tags.filter((item) => {
        if(filter == null && antiFilter == null) return true;

        if(filter != null && item.grouping == filter) return true;
        if(antiFilter != null && item.grouping != antiFilter) return true;

        return false;
    })

    return(
        <View>
            {props.children}
            {loading ? <ActivityIndicator size="small" animating={true} style={{flex: 1, alignSelf: "flex-start", margin: 0, padding: 0}}/> : null  }
            {(filteredTags.length == 0 && !loading) ? emptyContent : null}
                <View style={{flexDirection: "row", flexWrap: true, marginBottom: 10}}>
                        {filteredTags.map((item) => (
                            <Chip key={item.name}
                                  style={{
                                      margin: 3,
                                      backgroundColor: item.selected ? item.color : Color(item.color).darken(0.5).hex(),
                                  }}
                                  selectedColor={Color(item.color).darken(0.9).hex()}
                                  onPress={() => onPressed(item.uuid)}
                                  onLongPress={() => onLongPressed(item.uuid)}
                                  selected={item.selected}
                                    mode={"flat"}
                                    icon={!showIcon ? <Text /> : null}
                            > {item.name} </Chip>
                        ) )}
                    {persistentTag}     
                </View>
        </View>
    )
}

export default withTheme(TagView);