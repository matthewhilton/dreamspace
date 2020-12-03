import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme, Text } from 'react-native-paper'

const DreamStatisticPoint = ({icon="question",theme, value=-1, average=-1}) => {
    let averageComparisonIcon = {
        name: "minus",
        color:  theme.colors.statisticPoint.same   
    }

    if(value > average) {
        averageComparisonIcon = {
            name: "caret-up",
            color: theme.colors.statisticPoint.up
        }
    }
    if(value < average) {
        averageComparisonIcon = {
            name: "caret-down",
            color: theme.colors.statisticPoint.down
        }
    }

    return (
        <View style={{margin: 3, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={icon} color={theme.colors.text} solid size={20}/>
            <Text style={{fontSize: 25}}> {value} </Text>
            <Icon name={averageComparisonIcon.name} color={averageComparisonIcon.color} solid size={20} />
        </View>
    )
}

export default withTheme(DreamStatisticPoint)
