import React, {useEffect, useCallback} from 'react'
import { Alert, SafeAreaView, ScrollView} from 'react-native'
import { useDispatch } from "react-redux"
import { Button, IconButton, List, Switch, useTheme } from 'react-native-paper'
import useSettings from "../Hooks/UseSettings"
import HeaderWithNav from './HeaderWithNav'
import AlertAsync from 'react-native-alert-async'
import * as Haptics from "expo-haptics"

const SettingsPage = () => {
    const dispatch = useDispatch()
    const { settings, resetSettings, setSetting } = useSettings();

    const authLock = settings.find(setting => (setting.name == "JournalAuthenticationLockEnabled"))
    const authLockEnabled = authLock ? authLock.value : null;

    const theme = useTheme();

    const confirmResetData = useCallback(async () => {
        const choice = await AlertAsync(
            "Confirm Delete",
            "Are you sure you want to delete all your data? This action cannot be undone.",
            [
                {text: 'Delete', onPress: () => 'delete', style: 'destructive'},
                {text: 'Cancel', onPress: () => 'dont', style: 'cancel'},
            ],
        )
        if(choice == "dont"){
            return;
        }

        dispatch({type: "NUKE"})
        Alert.alert("Data was reset successfully");
        Haptics.notificationAsync("success")
    }, []) 

    const confirmResetSettings = useCallback(async () => {
        const choice = await AlertAsync(
            "Confirm Reset",
            "Are you sure you want to reset settings to their default values? This action cannot be undone.",
            [
                {text: 'Reset', onPress: () => 'reset', style: 'destructive'},
                {text: 'Cancel', onPress: () => 'dont', style: 'cancel'},
            ],
        )
        if(choice == "dont"){
            return;
        }

        resetSettings();
        Alert.alert("Settings were reset successfully");
        Haptics.notificationAsync("success")
    }, [])

    return (
        <SafeAreaView>
            <HeaderWithNav title="Settings" />
            <ScrollView>
                <List.Section>
                    <List.Subheader>Journal</List.Subheader>
                    <List.Item title="Require Authentication" left={() => 
                        <Switch
                        disabled={authLockEnabled == null}
                        value={authLockEnabled} 
                        onValueChange={() => setSetting("JournalAuthenticationLockEnabled", !authLockEnabled)}
                        />
                    }
                    description={"Use FaceID/Fingerprint/Passcode authentication to view journal"}/>

                    <List.Subheader>Legal</List.Subheader>
                    <List.Item title="Acknowledgements" left={() => 
                        <IconButton icon="file-document-outline" />
                    }/>
                    <List.Item title="License" left={() => 
                        <IconButton icon="file-document-outline" />
                    }/>
                    <List.Item title="Privacy Policy" left={() => 
                        <IconButton icon="file-document-outline" />
                    }/>
                    <List.Item title="Terms of Use" left={() => 
                        <IconButton icon="file-document-outline" />
                    }/>

                    <List.Subheader>Reset</List.Subheader>
                    <List.Item title="Reset to default settings" left={() => 
                        <IconButton icon="delete" onPress={confirmResetSettings} /> 
                    }/>
                    <List.Item title="Reset data" titleStyle={{color: theme.colors.error}} left={() => 
                        <IconButton icon="delete-forever" onPress={confirmResetData} color={theme.colors.error} />
                    }/>
                </List.Section>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsPage;
