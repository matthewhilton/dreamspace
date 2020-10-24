import React, {useState} from "react"
import { View, Dimensions, SafeAreaView} from "react-native"
import { Title, Button } from "react-native-paper"
import SectionProgressBar from "./SectionProgressBar"

const SectionedJournalEntryForm = (props) => {

    const [section, setSection] = useState(0)

    const sectionHeaders = [
        'Story',
        'Rating',
        'General'
    ]

    return(
        <View style={{height: Dimensions.get('screen').height, width: "100%"}}>
            <View style={{backgroundColor: "white", margin: 15, height: "90%", borderRadius: 25, padding: 10}}>

                <SectionProgressBar  section={section} sectionHeaders={sectionHeaders} />

                <Title> Journal Entry Form </Title>
                <Button onPress={props.onClose}> Close </Button>
            </View>
        </View>
    )
}

export default SectionedJournalEntryForm;