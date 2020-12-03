import React from "react";
import {View} from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import {Text, withTheme} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';

const SliderForm = (props) => {
    return(
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:10,}}>
                <Text style={{fontWeight: "bold"}}> {props.label} </Text>
                <Icon name={props.icon || ""} color={props.theme.colors.text} solid />
            </View>
            
            <Text> {props.description} </Text>
        <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
            <Text> {props.lowerText || "1" } </Text> 
            <Slider
                {...props}
                minimumValue={1}
                maximumValue={props.maxValue || 10}
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
            <Text> {props.upperText || "10" } </Text> 
        </View>
    </View>
    )
}

export default withTheme(SliderForm);