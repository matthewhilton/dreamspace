import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
import { Text, useTheme } from 'react-native-paper'
import { useSelector } from "react-redux"
import { hexAlpha } from "../../Functions/decimalToHex"
import Normalise from "../../Functions/normalise"
var Color = require('color');

const TagRelationChart = ({targetTagUUID, showLegend=true}) => {
    const allTags = useSelector(state => state.tags);
    const allDreams = useSelector(state => state.journal);
    const theme = useTheme();

    const [relatedTags, setRelatedTags] = useState([])
    useEffect(() => {
        // Whenever the targetTagUUID changes, update the relations
        
        // Filter the dreams by those that include the target tag
        let filteredDreams = allDreams.filter((dream) => {
            if(dream.tags.map((tag) => tag.uuid).includes(targetTagUUID)) {
                return dream;
            }
        })

        let tagRelations = {}
        filteredDreams.forEach(dream => {
            dream.tags.forEach(tag => {
                
                // Ignore target tag (will always exist because these have been filtered)
                if(tag.uuid != targetTagUUID){
                    if(tagRelations.hasOwnProperty(tag.name)) {
                        tagRelations[tag.name] += 1;
                    } else {
                        tagRelations[tag.name] = 1;
                    }
                }
            })
        })

        let normalisedValues = Normalise(Object.values(tagRelations));

        // Sort by the most used first and reformat, and use the normalised value
        let sortedRelations = Object.keys(tagRelations).map((key, index) => {
            return({name: key, amount: normalisedValues[index]})
        }).sort((a,b) => {
            return(b.amount - a.amount)
        })

        console.log(sortedRelations)
        setRelatedTags(sortedRelations)
    }, [targetTagUUID, setRelatedTags])

    const progressChartColorFunc = (index, opacity=null) => {
        if(index != undefined) {
            // Find the color of the tag
            const tag = allTags.find((tag) => tag.name == progressChartLabels[index])
            if(opacity != null){
                return(hexAlpha(tag.color, opacity))
            } else {
                return(tag.color)
            }
            
        } else {
            // Default return color
            return("#ffffff")
        }
    }

    // Format it as required for the progress chart
    const progressChartLabels = relatedTags.map((rel) => rel.name).reverse()
    const progressChartData = relatedTags.map((rel) => rel.amount).reverse()

    return (
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
            <ProgressChart 
                        data={{
                            labels: progressChartLabels,
                            data: progressChartData
                        }}
                        width={200}
                        height={200}
                        strokeWidth={16}
                        radius={32} 
                        chartConfig={{
                            backgroundGradientFrom: theme.colors.background,
                            backgroundGradientTo: theme.colors.background,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1, index) => progressChartColorFunc(index, opacity),
                            backgroundColor: (opacity = 1, index) => progressChartColorFunc(index, opacity),
                            }}
                        hideLegend={true}
                    />

            {showLegend ? 
                <View style={{flexDirection: 'column-reverse'}}>
                    {progressChartLabels.map((dreamLabel, index) => (
                        <View key={dreamLabel} style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                            <Text
                            style={{color: progressChartColorFunc(index)}}
                            numberOfLines={3}
                            > 
                                {dreamLabel} 
                            </Text>
                            <View style={{
                                backgroundColor: progressChartColorFunc(index),
                                padding: 5,
                                borderRadius: 5,
                                marginHorizontal:3
                                }}>
                                <Text style={{
                                    color: Color(progressChartColorFunc(index)).darken(0.75).hex(),
                                    fontWeight: "bold"
                                    }}>{Math.floor(progressChartData[index]*100)}%</Text>
                            </View>
                        </View>
                    ))}
                </View>
            : null}
        </View>
    )
}

export default TagRelationChart
