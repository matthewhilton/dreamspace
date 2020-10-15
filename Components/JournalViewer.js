import React from "react"
import {View} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { Button, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const JournalViewer = (props) => {

    let journal = useSelector(state => state.journal)
    if(!journal) journal = [];

    const dispatch = useDispatch()

    console.log(journal)

    return(
        <SafeAreaView style={{flex: 1}}>
            <Button mode="contained" onPress={() => dispatch({type: "NUKE"})}> Nuke Redux Store </Button>

            {journal.map((item) => (
               <View style={{flex: 1}} key={item.title}>
                    <Text> {item.title} </Text>
              </View>
            ))}
        </SafeAreaView>
    )
}

export default JournalViewer;