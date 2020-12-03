import React from "react"
import {View} from "react-native"
import {useDispatch, useSelector} from "react-redux"
import {Button, Text} from "react-native-paper"

const JournalViewer = (props) => {

    let journal = useSelector(state => state.journal)
    if (!journal) journal = [];

    const dispatch = useDispatch()

    return (
        <View>
            <Button mode="contained" onPress={() => dispatch({type: "NUKE"})}> Nuke Redux Store </Button>

            {journal.map((item) => (
                <View style={{flex: 1}} key={item.title}>
                    <Text> {item.title} </Text>
                </View>
            ))}
        </View>
    )
}

export default JournalViewer;