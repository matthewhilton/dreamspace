import React from "react";
import {View} from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import {Text, withTheme} from "react-native-paper";

const SliderForm = (props) => {

    return(
        <View style={{flex: 1}}>
            <Text style={{marginTop:10}}> {props.label} </Text>
        <View style={{flex: 1, flexDirection: 'row', alignContent: "center", justifyContent: "space-between"}}>
            <Slider
                {...props}
                minimumValue={1}
                maximumValue={10}
                step={1}
                style={{flex: 10}}
                onValueChange={(value) => {
                    Haptics.selectionAsync()
                    props.onChange(value)
                }}
                value={props.value}
                thumbTintColor={props.theme.colors.text}
                minimumTrackTintColor={props.theme.colors.primary}
            />
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text> {props.value} </Text>
            </View>

        </View>
    </View>
    )
}

export default withTheme(SliderForm);