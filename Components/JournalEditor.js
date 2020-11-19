import React, {useEffect} from 'react'
import { View, Text } from 'react-native'
import AlertAsync from 'react-native-alert-async'
import SectionedJournalEntryForm from './SectionedJournalEntryForm'

const JournalEditor = ({navigation, route}) => {
    const prefillData = route.params.data;

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const onClose = async () => {
        navigation.goBack();
    }

    return (
        <View style={{marginVertical: 20}}>
             <SectionedJournalEntryForm 
                prefillData={prefillData}
                onClose={onClose} 
                onSaveForm={() => {}}
                onAnimationHasReducedSize={() => {}}
                />
        </View>
    )
}

export default JournalEditor
