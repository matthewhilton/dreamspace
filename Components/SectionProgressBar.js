import React from "react"
import {View} from "react-native"
import {Text} from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome5';

const SectionProgresBar = (props) => {
    return(
        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
            {props.sectionHeaders.map((header, index) => (
                <View style={{flexDirection: "column", alignItems: 'center'}}>
                    <Text> {header} </Text>
                    {index < props.section ?  <Icon name="check-square" /> :  null}
                    {index == props.section ?  <Icon name="circle" /> :  null}
                    {index > props.section ?  <Icon name="square" /> :  null}
                </View>
            ))}
        </View>
    )
}

export default SectionProgresBar;