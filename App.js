import * as React from 'react';
import { View} from 'react-native';
import NewJournalEntrySheet from "./Components/NewJournalEntrySheet";
import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

const theme = {

    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme,
        text: "#D5CBA8",
        background: "#2c2627",
        background_main: "#151414",
        background_sheet:'#2c2627',
        disabled: "#78686B",
        placeholder: "#78686B",
        error: "#db6143",
        primary: "#DABC61",
        accent: "#a5ffd6",
    }
}
export default function App() {
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
