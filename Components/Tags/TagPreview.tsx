import React from 'react'
import { View } from 'react-native'
import {Text, useTheme } from "react-native-paper"
import usePlanets from "../../Hooks/UsePlanets"
import Icon from 'react-native-vector-icons/FontAwesome5';
import PlanetIconPreview from '../Display/PlanetIconPreview';
var Color = require('color');

interface Props {
    name: string,
    color: string,
    planetNumber: number
}

const TagPreview: React.FC<Props> = ({name, color, planetNumber}) => {
    const theme = useTheme();
    const {getPlanetIcon} = usePlanets();

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.tagPreviewBackground,
            borderRadius: 10,
            justifyContent: 'space-between',   
            }}>
                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 10
                }}>
                    <Text style={{
                        fontWeight: "bold", 
                        fontSize: 25,
                        }}
                        numberOfLines={2}>{name}</Text>
                    <Icon name="tag" solid style={{color: color, margin: 5, fontSize: 15}}/>
                </View>
            
                <PlanetIconPreview 
                    size={100}
                    backgroundColor={color}
                    iconNumber={planetNumber}
                    borderRadius={10}
                />

        </View>
    )
}

export default TagPreview
