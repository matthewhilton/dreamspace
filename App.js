import * as React from 'react';
import { View} from 'react-native';
import NewJournalEntrySheet from "./Components/NewJournalEntrySheet";
import { Button, DefaultTheme, withTheme, Provider as PaperProvider, Snackbar, Title} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import JournalViewer from "./Components/JournalViewer"
import { store, persistor } from "./Redux/store.js"
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

const Drawer = createDrawerNavigator();

const MainScreen = (props) => (
    <SpaceWalk />
)

const JournalLibraryScreen = (props) => {
    return(
        <SafeAreaView style={{backgroundColor: props.theme.colors.background_main, height: '100%'}}>
            
            <JournalLibrary />
        </SafeAreaView>
    )
}

export default function App() {

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ActionSheetProvider>
                        <PaperProvider theme={theme}>
                            <NavigationContainer>
                                <Drawer.Navigator initialRouteName="Main">
                                    <Drawer.Screen name="Main" component={withTheme(MainScreen)} />
                                    <Drawer.Screen name="Journal Library" component={withTheme(JournalLibraryScreen)} />
                                    
                                </Drawer.Navigator>
                            </NavigationContainer>
                        </PaperProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
