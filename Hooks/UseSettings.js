import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from "react"

export default useSettings = () => {
    const [settings, setSettings] = useState([])
    const [settingsUpdate, setSettingsUpdate] = useState(0)

    useEffect(() => {
        updateSettings()
    }, [settingsUpdate])

    const updateSettings = () => {
        getSettings().then((val) => {
            setSettings(val)
        });
    }

    const getSettings = async () => {
        let settings = [];
        for(const setting of settingsStructure){
            let value = JSON.parse(await AsyncStorage.getItem(setting.name));

            settings.push({ 
                name: setting.name,
                value: value == null ? setting.defaultValue : value
            })
        }
        return settings;
    }

    const setSetting = async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value))
        setSettingsUpdate(settingsUpdate + 1)
        return;
    }

    const resetSettings = async () => {
        for(const setting of settingsStructure){
            await setSetting(setting.name, setting.defaultValue);
        }
        console.log("reset settings")
    }

    return { settings, getSettings, setSetting, resetSettings };
}

const settingsStructure = [
    {name: "JournalAuthenticationLockEnabled", defaultValue: false},
]
