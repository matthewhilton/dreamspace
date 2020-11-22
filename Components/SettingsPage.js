import React from 'react'
import { SafeAreaView } from 'react-native'
import { useDispatch } from "react-redux"
import { Button } from 'react-native-paper'
import useSettings from "../Hooks/UseSettings"

const SettingsPage = () => {
    const dispatch = useDispatch()
    const { resetSettings } = useSettings();

    return (
        <SafeAreaView>
            <Button onPress={() => dispatch({type: "NUKE"})}> Nuke Store </Button>
            <Button onPress={() => resetSettings()}> Reset settings </Button>
        </SafeAreaView>
    )
}

export default SettingsPage;
