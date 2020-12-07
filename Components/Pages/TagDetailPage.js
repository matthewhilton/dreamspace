import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { IconButton, List, Text, useTheme } from 'react-native-paper';
import { useSelector } from "react-redux";
import usePlanets from "../../Hooks/UsePlanets";
import JournalLibraryEntry from "../Journal/Viewing/JournalLibraryEntry";

const TagDetailPage = ({route, navigation}) => {
    const tagUUID = route.params.tagUUID;
    const theme = useTheme()
    const { getPlanetIcon } = usePlanets()

    const [dreamsWithThisTag, setDreamsWithThisTag] = useState(null)
    const [dreamStatistics, setDreamStatistics] = useState({})
    
    if(tagUUID == undefined) {
        console.error("No Tag UUID given. Navigation error likely.")
        Alert.alert("Couldn't find tag data");
        navigation.goBack();
    }

    const tagData = useSelector(state => state.tags.find((tag) => tag.uuid == tagUUID))
    const allDreams = useSelector(state => state.journal)

    // Whenever tagdata changes, update the page options such as title, etc
    useEffect(() => {
        navigation.setOptions({
            title: "",
            headerShown: true,
            headerRight: () => (
                <View style={{flexDirection: "row"}}>
                    <IconButton icon="pencil" />
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
            averageLucidity,
            averageMemory,
            averageVividness,
        })
    }, [tagData, setDreamsWithThisTag, setDreamStatistics])

    return (
        <View>
            <ScrollView style={{height: "100%"}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15}}>
                <View style={{width: "70%"}}>
                    <Text style={{fontWeight: "bold", fontSize: 40, color: theme.colors.text}} numberOfLines={2}>
                        {tagData.name}
                    </Text>
                </View>

                <View style={{
                    margin: 10,
                    width: 50, 
                    height: 50
                    }}>
                    {getPlanetIcon(tagData.planet.icon)}
                </View>
            </View>

            <View style={{flexDirection: "row", marginHorizontal: 15}}>
                <BigStatistic top={tagData.used} bottom={"used"} />
                <BigStatistic top={dreamStatistics.averageLucidity || "-"} bottom={"average lucidity"} />
            </View>
        
            <List.Section>
                <List.Subheader>Statistics</List.Subheader>
                <List.Item left={() => <Text style={{fontWeight: "bold", alignSelf:"center", fontSize: 30}}> {dreamStatistics.averageMemory || "-"} </Text>} title="Average Memory" />
                <List.Item left={() => <Text style={{fontWeight: "bold", alignSelf:"center", fontSize: 30}}> {dreamStatistics.averageLucidity || "-"} </Text>} title="Average Lucidity" />
                <List.Item left={() => <Text style={{fontWeight: "bold", alignSelf:"center", fontSize: 30}}> {dreamStatistics.averageVividness || "-"} </Text>} title="Average Vividness" />
                {dreamsWithThisTag != null && dreamsWithThisTag.length > 0 ? 
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

const BigStatistic = ({top,bottom, maxWidth=150, marginRight=50}) => (
    <View style={{maxWidth: maxWidth, marginRight: marginRight}}>
        <Text style={{fontWeight: "bold", fontSize: 30}}>{top}</Text>
        <Text style={{fontSize: 15}}>{bottom}</Text>
    </View>
)

export default TagDetailPage