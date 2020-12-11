import React from 'react'
import { View } from 'react-native'
import {Text, useTheme } from "react-native-paper"
import usePlanets from "../../Hooks/UsePlanets"
import Icon from 'react-native-vector-icons/FontAwesome5';
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

                <View style={{
                    width: 100,
                    height: 100,
                    backgroundColor: color,
                    padding: 10,
                    borderRadius: 10
                }}>
                    {getPlanetIcon(planetNumber)}
                </View>
        </View>
    )
}

export default TagPreview
