import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from "react"

export default useSettings = () => {
    const [settings, setSettings] = useState(null)

    useEffect(() => {
        getSettings().then((val) => {
            setSettings(val)
        });
    }, [])

    const getSettings = async () => {
        let settings = [];
        for(const setting of settingsStructure){
            let value = await AsyncStorage.getItem(setting.name);

            settings.push({ 
                name: setting.name,
                value: value == null ? setting.defaultValue : value
            })
        }
        return settings;
    }

    return { settings };
}

const settingsStructure = [
    {name: "JournalAuthenticationLockEnabled", defaultValue: false},
    {name: "HasAskedUserJournalAuthenticationLock", defaultValue: false},
]
