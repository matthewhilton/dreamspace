import * as React from 'react';
import { Button, DefaultTheme, withTheme, Provider as PaperProvider} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from "./Redux/store"
import SpaceWalk from './Components/SpaceWalk';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import JournalLibrary from "./Components/JournalLibrary"

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
        recordingButton: "#db5a44",
        orbit: "rgba(255,255,255,0.1)"
    }
}

const CombinedDarkTheme = {
    ...theme,
    ...DarkTheme,
    colors: { ...DarkTheme.colors, ...theme.colors },
  };

const Drawer = createDrawerNavigator();

export default function App() {

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ActionSheetProvider>
                        <PaperProvider theme={CombinedDarkTheme}>
                            <NavigationContainer theme={CombinedDarkTheme}>
                                <Drawer.Navigator initialRouteName="Home">
                                    <Drawer.Screen name="Home" component={SpaceWalk} />
                                    <Drawer.Screen name="Journal" component={JournalLibrary} />
                                </Drawer.Navigator>
                            </NavigationContainer>
                        </PaperProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
