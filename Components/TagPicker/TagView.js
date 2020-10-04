import React from "react"
import { View, Dimensions } from "react-native";
import {Chip, Text, Title, withTheme} from "react-native-paper";

const TagView = ({tags=[], title="Current Tags", emptyContent=<View />, ...props}) => {
    return(
        <View style={{minHeight: Dimensions.get("screen").height/6}}>
            <Title style={{fontWeight: "bold"}}> {title} </Title>
            {props.children}
            {tags.length == 0 ?
                emptyContent
                : null}
            <View style={{flex: 1, flexDirection: "row", alignContent: "center"}}>
                {tags.map((item) => (
                    <Chip onPress={() => props.onPressed(item.id)}> {item.text} </Chip>
                ))}
            </View>
        </View>

    )
}

export default withTheme(TagView);