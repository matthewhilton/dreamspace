import * as React from 'react';
import { View} from 'react-native';
import NewJournalEntrySheet from "./Components/NewJournalEntrySheet";
import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme,
        background: "#061214",
        background_sheet:'#060606',
        focus: "#00fddc",
        buttonAccent: "#115e7a",
    }
}
export default function App() {
    return (
        <>
            <PaperProvider theme={theme}>
            <View>

                {// Router / Navigation here
                    //
                }

                <NewJournalEntrySheet />
            </View>
            </PaperProvider>
        </>
    );
}
