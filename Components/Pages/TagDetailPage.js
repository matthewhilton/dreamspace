import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, View } from 'react-native';
import {
    ContributionGraph
} from "react-native-chart-kit";
import { IconButton, List, Text, useTheme } from 'react-native-paper';
import { useSelector } from "react-redux";
import { hexAlpha } from "../../Functions/decimalToHex";
import groupBy from '../../Functions/groupBy';
import usePlanets from "../../Hooks/UsePlanets";
import JournalLibraryEntry from "../Journal/Viewing/JournalLibraryEntry";
import TagRelationsChart from "../Tags/TagRelationChart"
var Color = require('color');

const TagDetailPage = ({route, navigation}) => {
    const tagUUID = route.params.tagUUID;
    const theme = useTheme()
    const { getPlanetIcon } = usePlanets()

    const [dreamsWithThisTag, setDreamsWithThisTag] = useState([])
    const [dreamStatistics, setDreamStatistics] = useState({})
    const [dreamGroupings, setDreamGroupings] = useState([])
 
    if(tagUUID == undefined) {
        console.error("No Tag UUID given. Navigation error likely.")
        Alert.alert("Couldn't find tag data");
        navigation.goBack();
    }

    const chartConfig = {
        backgroundColor: theme.colors.journalFormBackground,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity=1) => hexAlpha("#ffffff", opacity),
        labelColor: (opacity=1) => hexAlpha("#ffffff", opacity),
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }

    const tagData = useSelector(state => state.tags.find((tag) => tag.uuid == tagUUID))
    const allDreams = useSelector(state => state.journal)

    const onEdit = () => {
        // Navigate to the editor with mode "edit" using the current tagUUID
        navigation.navigate("Tags", { screen: "TagEditor", params: { mode: "edit", tagUUID: tagUUID}})
    }

    // Whenever tagdata changes, update the page options such as title, etc
    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerShown: true,
            headerRight: () => (
                <View style={{flexDirection: "row"}}>
                    <IconButton icon="pencil" onPress={onEdit}/>
                    <IconButton icon="delete" />
                </View>
            )
        })

        // Also update the dreams that use this tag
        const filteredDreams = [...allDreams].filter((item) => {
            const matchingTags = item.tags.filter((tag) => tag.uuid == tagUUID)
            if(matchingTags.length > 0){
                return item;
            }
        })
        setDreamsWithThisTag(filteredDreams)

        // Calculate average lucidity from the filtered dreams
        const averageLucidity = filteredDreams.reduce((accumulator, currentVal) => accumulator + currentVal.lucidity, initialValue=0)/filteredDreams.length;
        const averageMemory = filteredDreams.reduce((accumulator, currentVal) => accumulator + currentVal.memory, initialValue=0)/filteredDreams.length;
        const averageVividness = filteredDreams.reduce((accumulator, currentVal) => accumulator + currentVal.vividness, initialValue=0)/filteredDreams.length;
        setDreamStatistics({
            averageLucidity: averageLucidity.toFixed(1),
            averageMemory: averageMemory.toFixed(1),
            averageVividness: averageVividness.toFixed(1),
        })

        // Group the dreams by date to show in graphs
        let dateGrouping = (item) => {
            let date = new Date(item.date)
            return(date.toDateString())
        }
        
        // Do a bunch of sorting and reformatting to suit the graphing library
        let groupedDreams = groupBy(filteredDreams, dateGrouping)
        groupedDreams = Object.keys(groupedDreams).map((key) => ({
            date: key, 
            count: groupedDreams[key].length
        }))
        setDreamGroupings(groupedDreams)
    }, [tagData, setDreamsWithThisTag, setDreamStatistics])

    return (
        <View>
            <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15}}>
                <View style={{width: "70%"}}>
                    <Text style={{fontWeight: "bold", fontSize: 40, color: theme.colors.text}} numberOfLines={2}>
                        {tagData.name}
                    </Text>
                </View>
                <View style={{
                    margin: 10,
                    width: 90, 
                    height: 90, 
                    backgroundColor: tagData.color,
                    padding: 10,
                    borderRadius: 10,
                    }}>
                    {getPlanetIcon(tagData.planet.icon)}
                </View>
            </View>
            
            <List.Section>
                <List.Subheader>Usage</List.Subheader>
                <View style={{height: 210}}>
                    <ContributionGraph
                        values={dreamGroupings}
                        endDate={new Date()}
                        numDays={90}
                        chartConfig={chartConfig}
                    />
                </View>

                <List.Subheader>Statistics</List.Subheader>
                <View style={{marginLeft: 15}}>
                    <BigStatistic top={tagData.used} bottom={"used"} />
                </View>
               {/* 
               <TagStatisticView 
                leftText={dreamStatistics.averageMemory || "-"} 
                title="Average Memory" 
                data={dreamsWithThisTag.map(item => item.memory).reverse()}
                axis={dreamsWithThisTag.map(item => item.date).reverse()}
                />
               
               <TagStatisticView leftText={dreamStatistics.averageLucidity || "-"} title="Average Lucidity" />
                <TagStatisticView leftText={dreamStatistics.averageVividness || "-"} title="Average Vividness" />
                */
            }   
                <List.Subheader>Links to Other Tags</List.Subheader>
                <TagRelationsChart targetTagUUID={tagData.uuid}/>
               
                {dreamsWithThisTag.length > 0 ? 
                    <List.Accordion
                    title="Dreams using this tag"
                    >
                        <View style={{marginHorizontal: 15}}>
                            {dreamsWithThisTag.map((item) => (
                                <JournalLibraryEntry data={item} key={item.uuid} onPress={() => 
                                    navigation.navigate("Journal", { screen: 'JournalEntryView', params: { data: item }})
                                }/>
                            ))}
                        </View>
                    </List.Accordion>
                : null }                
            </List.Section>
        </ScrollView>
    </View>
    )
}

const TagStatisticView = ({leftText, title, data, axis}) => {
    const theme = useTheme()
    const [width, setWidth] = useState(Dimensions.get("screen").width*0.9)

    return(
        <View style={{margin: 10}}>
            <List.Item left={() => <Text style={{fontWeight: "bold", alignSelf:"center", fontSize: 30}}> {leftText} </Text>} title={title} />
            

            <View onLayout={event => setWidth(event.nativeEvent.layout.width)}>
                {/* <LineChart 
                data={{
                    labels: axis,
                    datasets: [
                        {
                            data: data
                        }
                    ]
                }}
                height={200}
                chartConfig={{
                    color: () => Color("#ffffff").hex(),
                    backgroundColor: () => Color("#ffffff").hex(),
                }}
                width={width}
                bezier
            />*/
}
            </View>
        </View>
    )
}

const BigStatistic = ({top,bottom, maxWidth=150, marginRight=50}) => (
    <View style={{maxWidth: maxWidth, marginRight: marginRight}}>
        <Text style={{fontWeight: "bold", fontSize: 30}}>{top}</Text>
        <Text style={{fontSize: 15}}>{bottom}</Text>
    </View>
)

export default TagDetailPage