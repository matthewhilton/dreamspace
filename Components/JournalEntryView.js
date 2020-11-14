import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { Text, withTheme} from "react-native-paper";

import { useSelector } from "react-redux";
import getJournalAverages from "../Functions/getJournalAverages";
import DreamStatisticPoint from "./DreamStatisticPoint";

const JournalEntryView = ({route, navigation, theme}) => {
    const data = route.params.data;
    const journalSelector = useSelector(state => state.journal)
    const [averages, setAverages] = useState({})

    useEffect(() => {
        navigation.setOptions({
            title: ""
        })

        // Run functions to get statistics whenever the data changes
        setAverages(getJournalAverages(journalSelector))
        // TODO some more functions, e.g. maybe a ML model to find trends?
    }, [data])

    const oneDay = 24 * 60 * 60 * 1000;
    
    return (
        <View style={{margin: 10}}>
            <View style={{marginBottom: 20}}>
                <Text style={{fontWeight: "bold", fontSize: 40}}> {data.title || "untitled"} </Text>
                <Text style={{color: theme.colors.subtext, fontSize: 15, fontWeight: "bold", marginLeft: 10}}>{new Date(data.date).toLocaleDateString()} ({Math.round(Math.abs((new Date() - new Date(data.date)) / oneDay))} DAYS AGO)</Text>
            </View>

            <View style={{flexDirection: 'row', marginHorizontal: 10}}> 
                <DreamStatisticPoint icon="brain" value={data.memory} average={averages.memory} />
                <DreamStatisticPoint icon="eye" value={data.lucidity} average={averages.lucidity}/>
                <DreamStatisticPoint icon="sun" value={data.vividness} average={averages.vividness}/>
            </View>
        </View>
    )
}

export default withTheme(JournalEntryView)
