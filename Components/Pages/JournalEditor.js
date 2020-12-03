import React, {useEffect} from 'react'
import {View} from 'react-native'
import SectionedJournalEntryForm from '../Journal/SectionedJournalEntryForm'

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
