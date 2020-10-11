import React from "react"
import { View, Dimensions } from "react-native";
import {ActivityIndicator, Chip, Text, Title, withTheme} from "react-native-paper";

const TagView = ({tags=[], title="Current Tags", emptyContent=<Text />,loading=false,onPressed=function(){},filter=null,antiFilter=null, ...props}) => {

    const filteredTags = tags.filter((item) => {
        if(filter == null && antiFilter == null) return true;

        if(filter != null && item.grouping == filter) return true;
        if(antiFilter != null && item.grouping != antiFilter) return true;

        return false;
    })

    return(
        <View style={{minHeight: Dimensions.get("screen").height/6}}>
            <Title style={{fontWeight: "bold"}}> {title}  </Title>
            {props.children}

            {loading ? <ActivityIndicator size="small" animating={true} style={{flex: 1, alignSelf: "flex-start", margin: 0, padding: 0}}/> : null  }
            {(filteredTags.length == 0 && !loading) ? emptyContent : null}

            <View style={{flex: 1, flexDirection: "row", alignContent: "center", flexWrap: true, marginBottom: 10}}>
                    {filteredTags.map((item) => (
                        <Chip key={item.name} style={{margin: 1}} onPress={() => onPressed(item.name)}> {item.name} </Chip>
                    ) )}
            </View>
        </View>
    )
}

export default withTheme(TagView);