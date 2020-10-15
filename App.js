import * as React from 'react';
import { View} from 'react-native';
import NewJournalEntrySheet from "./Components/NewJournalEntrySheet";
import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import JournalDatabase from './Functions/journalDatabase';

const theme = {

    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme,
        text: "#D5CBA8",
        subtext: "#918b73",
        background: "#2c2627",
        background_main: "#151414",
        background_sheet:'#2c2627',
        disabled: "#78686B",
        placeholder: "#78686B",
        error: "#db6143",
        primary: "#DABC61",
        accent: "#a5ffd6",
        recordingButton: "#db5a44"
    }
}
export default function App() {

    React.useEffect(() => {
        console.log("Mounted, querying all entries")
        JournalDatabase.getAllEntryies().then((data) => {
            console.log("Entries: ", data)
        })
    }, [])

    return (
        <>
            <ActionSheetProvider>
                <PaperProvider theme={theme}>
                    <View>

                        {// Router / Navigation here
                            //
                        }

                        <NewJournalEntrySheet />
                    </View>
                </PaperProvider>
            </ActionSheetProvider>
        </>
    );
}
