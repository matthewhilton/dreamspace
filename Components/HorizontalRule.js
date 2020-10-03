import React from "react"
import {withTheme} from "react-native-paper";
import {View } from "react-native";

const HorizontalRule = (props) => (
    <View
        style={{
            borderBottomColor: props.theme.colors.placeholder,
            borderBottomWidth: 1,
            marginVertical: 5
        }}
    />
)

export default withTheme(HorizontalRule);