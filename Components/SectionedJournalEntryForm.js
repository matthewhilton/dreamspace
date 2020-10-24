import React from "react"
import { View, Dimensions, SafeAreaView} from "react-native"
import { Title, Button } from "react-native-paper"

const SectionedJournalEntryForm = (props) => {

    return(
        <View style={{height: Dimensions.get('screen').height, width: "100%"}}>
            <View style={{backgroundColor: "white", margin: 15, height: "90%", borderRadius: 25, padding: 10}}>
                <Title> Journal Entry Form </Title>
                <Button onPress={props.onClose}> Close </Button>
            </View>
        </View>
    )
}

export default SectionedJournalEntryForm;