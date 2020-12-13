import React from 'react'
import { View, Text } from 'react-native'
import usePlanets from "../../Hooks/UsePlanets"

interface Props {
    borderRadius?: number,
    size?: number,
    backgroundColor?: string | null,
    padding?: number,
    iconNumber: number
}

const PlanetIconPreview: React.FC<Props> = ({borderRadius=8, size=70, backgroundColor=null, padding=10, iconNumber}) => {
    const { getPlanetIcon } = usePlanets()

    return (
        <View style={{
            borderRadius: borderRadius,
            width: size,
            height: size,
            padding: padding,
            backgroundColor: backgroundColor === null ? "rgba(0,0,0,0)" : backgroundColor,
        }}>
            {getPlanetIcon(iconNumber)}
        </View>
    )
}

export default PlanetIconPreview