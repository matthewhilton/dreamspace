import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import PlanetIconPreview from '../Display/PlanetIconPreview'
import usePlanets from "../../Hooks/UsePlanets"

interface Props {
    value: number,
    onChange: Function,
}

const PlanetPickerForm: React.FC<Props> = ({value, onChange}) => {
    const { iconKeyList } = usePlanets()
    return (
        <View>
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    margin: 10,
                    
                    }}>
                {iconKeyList.map((key) => (
                    <TouchableOpacity onPress={() => onChange(key)} key={key} style={{margin: 5}}>
                        <PlanetIconPreview 
                        iconNumber={key} 
                        backgroundColor={value === key ? "rgba(255,255,255,0.1)" : null}
                        />
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default PlanetPickerForm
