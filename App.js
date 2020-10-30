import * as React from 'react';
import { View} from 'react-native';
import NewJournalEntrySheet from "./Components/NewJournalEntrySheet";
import { Button, DefaultTheme, withTheme, Provider as PaperProvider, Snackbar, Title} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import JournalViewer from "./Components/JournalViewer"
import { store, persistor } from "./Redux/store"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuHamburger from './Components/MenuHamburger';
import JournalLibrary from './Components/JournalLibrary';
import HeaderWithNav from './Components/HeaderWithNav';
import SpaceWalk from './Components/SpaceWalk';

const theme = {

    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme,
        mainScreenBackground: "#0A0A0A",
        journalFormBackground: "#141414",
        text: "#D5CBA8",
        subtext: "#918b73",
        background: "#141414",
        disabled: "#78686B",
        placeholder: "#595959",
        error: "#db6143",
        primary: "#e2856e",
        accent: "#E2856E",
        accent2: "#F39C6B",
        recordingButton: "#db5a44"
    }
}


export default function App() {

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ActionSheetProvider>
                        <PaperProvider theme={theme}>
                            <SpaceWalk />
                        </PaperProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
