import React from "react"
import {View} from "react-native"
import {Text, withTheme} from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome5';

const SectionProgresBar = (props) => {
    return(
        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginBottom: 10}}>
            {props.sectionHeaders.map((header, index) => (
                <View style={{flexDirection: "column", alignItems: 'center'}} key={index}>
                    <Text> {header} </Text>
                    {index < props.section ?  <Icon name="check-square" solid color={props.theme.colors.text}/> :  null}
                    {index == props.section ?  <Icon name="circle" solid color={props.theme.colors.text}/> :  null}
                    {index > props.section ?  <Icon name="square" color={props.theme.colors.text}/> :  null}
                </View>
            ))}
        </View>
    )
}

export default withTheme(SectionProgresBar);