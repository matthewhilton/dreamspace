import React from "react"
import { View, ScrollView, Dimensions } from "react-native";
import {ActivityIndicator, Chip, Text, Title, withTheme} from "react-native-paper";
import {LightenDarkenColor} from "lighten-darken-color";
var Color = require('color');

const TagView = ({tags=[], emptyContent=<Text />,loading=false,onPressed=function(){},filter=null,antiFilter=null, ...props}) => {

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
                                      margin: 1,
                                      backgroundColor: item.selected ? item.color : Color(item.color).darken(0.4).hex(),
                                  }}
                                  selectedColor={Color(item.color).darken(0.7).hex()}
                                  onPress={() => onPressed(item.name)}
                                  selected={item.selected}
                                    mode={"flat"}
                            > {item.name} </Chip>
                        ) )}
                </View>

        </View>
    )
}

export default withTheme(TagView);