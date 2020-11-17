import React from 'react'
import { SafeAreaView } from 'react-native'
import { useDispatch } from "react-redux"
import { Button } from 'react-native-paper'

const SettingsPage = () => {
    const dispatch = useDispatch()

    return (
        <SafeAreaView>
            <Button onPress={() => dispatch({type: "NUKE"})}> Nuke Store </Button>
        </SafeAreaView>
    )
}

export default SettingsPage;
